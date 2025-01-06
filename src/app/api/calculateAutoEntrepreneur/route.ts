import { NextResponse } from 'next/server';
import { calculateAutoEntrepreneur } from '@/services/autoEntrepreneurService';

export async function POST(request: Request) {
  try {
    const { declaredRevenue } = await request.json();

    // Validate input
    if (typeof declaredRevenue !== "number" || declaredRevenue < 0) {
      return NextResponse.json(
        { error: "Invalid declaredRevenue value" },
        { status: 400 }
      );
    }

    // Call the service to calculate values
    const data = await calculateAutoEntrepreneur(declaredRevenue);

    console.log('-----------------------------------------')
    console.log("data.evaluate", data.evaluate);
    console.log('-----------------------------------------')

    // Extract values from the API response
    const cotisations = data.evaluate[0].nodeValue;

    const revenuNet = data.evaluate[2].nodeValue;
    console.log('-----------------------------------------')
    console.log("cotisations", cotisations);
    console.log("revenuNet", revenuNet);
    console.log('-----------------------------------------')
    // Return the calculated values
    return NextResponse.json({ cotisations, revenuNet });
  } catch (error) {
    console.error("Error calculating net income:", error);
    return NextResponse.json(
      { error: "Failed to calculate net income" },
      { status: 500 }
    );
  }
}