import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    console.log('Received itinerary request for:', formData.fullName);

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found');
      return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate dates for each day
    const startDate = new Date(formData.startDate);
    const dates = [];
    for (let i = 0; i < parseInt(formData.numberOfDays); i++) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(currentDate.toISOString().split('T')[0]);
    }

    const prompt = `Create a detailed ${formData.numberOfDays}-day itinerary for Jharkhand, India based on the following preferences:

TRAVELER INFO:
- Name: ${formData.fullName}
- Travel Companions: ${formData.travelCompanions || 'Not specified'}
- Group Size: ${formData.groupSize || 'Not specified'}
- Travel Style: ${formData.travelStyle || 'Not specified'}
- Travel Pace: ${formData.travelPace || 'Not specified'}

PREFERENCES:
- Preferred Regions: ${formData.preferredRegions?.join(", ") || 'Any region in Jharkhand'}
- Interests: ${formData.interests?.join(", ") || 'General sightseeing'}
- Must-see Attractions: ${formData.mustSeeAttractions || 'None specified'}
- Budget Range: ${formData.totalBudget || 'Not specified'}
- Accommodation Type: ${formData.accommodationType || 'Not specified'}
- Transportation: ${formData.transportMode || 'Not specified'}
- Food Preferences: ${formData.foodPreference || 'Not specified'}
- Dietary Restrictions: ${formData.dietaryRestrictions?.join(", ") || 'None'}
- Local Cuisine Interest: ${formData.localCuisineInterest || 'Moderate'}

SPECIAL REQUIREMENTS:
- Special Needs: ${formData.specialNeeds || 'None'}
- Special Requests: ${formData.specialRequests || 'None'}

Please create a comprehensive day-by-day itinerary in JSON format with this exact structure, using the following dates: ${dates.join(', ')}:
[
  {
    "day": 1,
    "date": "${dates[0]}",
    "location": "Primary location/city for the day",
    "activities": ["Morning activity with timing", "Afternoon activity with timing", "Evening activity with timing"],
    "meals": {
      "breakfast": "Restaurant/hotel suggestion with local specialties",
      "lunch": "Local restaurant with cuisine type and signature dishes",
      "dinner": "Restaurant suggestion with authentic Jharkhand specialties"
    },
    "accommodation": "Specific hotel/lodge recommendation with amenities",
    "transportation": "Detailed transport mode and logistics",
    "budget": "Estimated daily budget in INR with breakdown",
    "notes": "Cultural insights, tips, best times to visit, local customs"
  }
]

IMPORTANT: Use the exact dates provided (${dates.join(', ')}) for each day of the itinerary.

Focus on authentic Jharkhand experiences including:
- Tribal culture and villages (Santhal, Munda, Ho communities)
- Natural attractions (Netarhat hill station, Hundru/Dassam/Jonha waterfalls)
- Wildlife (Betla National Park, Palamau Tiger Reserve)
- Religious sites (Deoghar Baidyanath Temple, Parasnath Hill)
- Adventure activities (trekking, rock climbing, camping)
- Local crafts and markets (tribal handicrafts, bell metal work)
- Cultural festivals and traditions
- Local cuisine specialties

Ensure realistic travel times, authentic local experiences, and practical logistics. Include specific restaurant names, accommodation options, and activity timings where possible.

Return ONLY the JSON array without any markdown formatting or additional text.`;

    console.log('Calling Gemini API...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text length:', generatedText.length);

    // Clean up the response and parse JSON
    const cleanedText = generatedText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let itinerary;
    try {
      itinerary = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw text:', cleanedText.substring(0, 500));
      throw new Error('Failed to parse itinerary JSON');
    }

    // Validate itinerary structure
    if (!Array.isArray(itinerary)) {
      throw new Error('Generated itinerary is not an array');
    }

    console.log('Successfully generated itinerary with', itinerary.length, 'days');

    return new Response(JSON.stringify(itinerary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-itinerary function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate itinerary',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});