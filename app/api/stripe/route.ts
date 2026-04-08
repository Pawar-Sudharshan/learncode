import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { userSubscription } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { stripe } from '@/lib/stripe';

// The return URL after successful checkout or portal management
const returnUrl = process.env.NEXT_PUBLIC_APP_URL + "/dashboard";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Query the database to check for an existing Stripe subscription for this user
    const userSubscriptionResult = await db.select()
      .from(userSubscription)
      .where(eq(userSubscription.userId, userId));

    const subscription = userSubscriptionResult[0];

    // Path A: The user is already a PRO member
    // Trigger the Stripe Billing Portal to allow them to manage or cancel their sub.
    if (subscription && subscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: returnUrl,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    // Path B: The user is currently on the FREE plan
    // Trigger a new Stripe Checkout Session to initiate the subscription flow.
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.primaryEmailAddress?.emailAddress,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Requires your Stripe Price ID in .env.local
          quantity: 1,
        },
      ],
      success_url: returnUrl,
      cancel_url: returnUrl,
      metadata: {
        userId, // CRITICAL: This allows the webhook to map the payment back to the user record
      },
    });

    return NextResponse.json({ url: stripeSession.url });

  } catch (error) {
    console.error("Error in Stripe checkout session creation:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
