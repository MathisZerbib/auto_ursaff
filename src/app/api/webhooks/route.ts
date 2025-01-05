// import type { Stripe } from "stripe";
// import { NextResponse } from "next/server";
// import getStripe from "@/utils/get-stripe";

// export async function POST(req: Request) {
//   const stripe = await getStripe();

//   if (!stripe) {
//     const errorMessage = "Stripe initialization failed";
//     console.log(`❌ Error message: ${errorMessage}`);
//     return NextResponse.json(
//       { message: `Webhook Error: ${errorMessage}` },
//       { status: 500 }
//     );
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       await (await req.blob()).text(),
//       req.headers.get("stripe-signature") as string,
//       process.env.STRIPE_WEBHOOK_SECRET as string
//     );
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : "Unknown error";
//     console.log(`❌ Error message: ${errorMessage}`);
//     return NextResponse.json(
//       { message: `Webhook Error: ${errorMessage}` },
//       { status: 400 }
//     );
//   }

//   console.log("✅ Success:", event.id);

//   const permittedEvents: string[] = [
//     "checkout.session.completed",
//     "payment_intent.succeeded",
//     "payment_intent.payment_failed",
//   ];

//   if (permittedEvents.includes(event.type)) {
//     let data;

//     try {
//       switch (event.type) {
//         case "checkout.session.completed":
//           data = event.data.object as Stripe.Checkout.Session;
//           console.log(`💰 CheckoutSession status: ${data.payment_status}`);
//           break;
//         case "payment_intent.payment_failed":
//           data = event.data.object as Stripe.PaymentIntent;
//           console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
//           break;
//         case "payment_intent.succeeded":
//           data = event.data.object as Stripe.PaymentIntent;
//           console.log(`💰 PaymentIntent status: ${data.status}`);
//           break;
//         default:
//           throw new Error(`Unhandled event: ${event.type}`);
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Unknown error";
//       console.log(`❌ Error handling event: ${errorMessage}`);
//       return NextResponse.json(
//         { message: `Event Handling Error: ${errorMessage}` },
//         { status: 500 }
//       );
//     }
//   }

//   return NextResponse.json({ message: "Received" }, { status: 200 });
// }