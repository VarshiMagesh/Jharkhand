import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai@^0.21.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [], language = 'english' } = await req.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Language-specific system prompts - each language responds ONLY in that language
    const languagePrompts = {
      english: `You are a friendly, informative travel assistant for Jharkhand tourism. Provide answers that are clear, helpful, and easy to read. Always use bullet points or numbered lists to present places, tips, or steps. Your responses should: - Be under 120 words. - Cover relevant details like location, highlights, best time to visit, and tips. - Be engaging, conversational, and practical. - Focus on clarity — no long paragraphs. Cover topics like: Popular destinations, culture, festivals, tribal traditions, accommodation, transport tips, cuisine, nature spots, waterfalls, wildlife parks, adventure activities, historical monuments, temples, and heritage sites. Focus on useful facts + practical advice and keep the tone engaging, clear, and trustworthy.`,
      
      hindi: `आप झारखंड पर्यटन के लिए एक मित्रवत, जानकारी भरपूर यात्रा सहायक हैं। केवल हिंदी में उत्तर दें। महत्वपूर्ण तकनीकी शब्दों के अलावा अंग्रेजी का बिल्कुल प्रयोग न करें। स्पष्ट, उपयोगी और आसान उत्तर दें। स्थानों, सुझावों या चरणों को प्रस्तुत करने के लिए हमेशा बुलेट पॉइंट्स या नंबर्ड लिस्ट का उपयोग करें। आपके उत्तर में होना चाहिए: * 120 शब्दों के अंतर्गत * स्थान, मुख्य आकर्षण, घूमने का सबसे अच्छा समय और सुझाव * आकर्षक, बातचीत वाला और व्यावहारिक * स्पष्टता पर ध्यान — लंबे पैराग्राफ नहीं विषयों में शामिल हैं: लोकप्रिय गंतव्य (रांची, जमशेदपुर, धनबाद, देवघर, हजारीबाग), संस्कृति, त्यौहार, आदिवासी परंपराएं, आवास, परिवहन सुझाव, व्यंजन और प्राकृतिक स्थान। केवल हिंदी में जवाब दें, दूसरी भाषाओं का मिश्रण न करें।`,
      
      tamil: `நீங்கள் ஜார்கண்ட் சுற்றுலாவுக்கான நட்பான, தகவல் நிறைந்த பயண உதவியாளர். தமிழில் மட்டுமே பதிலளிக்கவும். முக்கியமான தொழில்நுட்ப சொற்கள் தவிர வேறு எந்த மொழியையும் பயன்படுத்த வேண்டாம். தெளிவான, பயனுள்ள மற்றும் எளிதில் படிக்கக்கூடிய பதில்களை வழங்குங்கள். இடங்கள், குறிப்புகள் அல்லது படிகளை வழங்க எப்போதும் புல்லட் பாயிண்ட்கள் அல்லது எண்ணிடப்பட்ட பட்டியல்களைப் பயன்படுத்துங்கள். உங்கள் பதில்களில் இருக்க வேண்டும்: * 120 சொற்களுக்குள் * இடம், சிறப்பம்சங்கள், செல்ல சிறந்த நேரம் மற்றும் குறிப்புகள் * கவர்ச்சிகரமான, உரையாடல் மற்றும் நடைமுறை * தெளிவில் கவனம் — நீண்ட பத்திகள் இல்லை பிரபலமான இடங்கள், கலாச்சாரம், பண்டிகைகள், பழங்குடி மரபுகள், தங்குமிடம், போக்குவரத்து குறிப்புகள், உணவு மற்றும் இயற்கை இடங்கள் போன்ற தலைப்புகள். தமிழில் மட்டுமே பதிலளிக்கவும், பிற மொழிகளை கலக்க வேண்டாம்।`,
      
      bengali: `আপনি ঝাড়খণ্ড পর্যটনের জন্য একটি বন্ধুত্বপূর্ণ, তথ্যবহুল ভ্রমণ সহায়ক। শুধুমাত্র বাংলায় উত্তর দিন। গুরুত্বপূর্ণ প্রযুক্তিগত শব্দ ছাড়া অন্য কোনো ভাষা ব্যবহার করবেন না। স্পষ্ট, সহায়ক এবং সহজে পড়ার মতো উত্তর দিন। স্থান, টিপস বা পদক্ষেপ উপস্থাপন করার জন্য সর্বদা বুলেট পয়েন্ট বা সংখ্যাযুক্ত তালিকা ব্যবহার করুন। আপনার উত্তরে থাকা উচিত: * ১২০ শব্দের মধ্যে * অবস্থান, হাইলাইট, ভ্রমণের সেরা সময় এবং টিপস * আকর্ষক, কথোপকথনমূলক এবং ব্যবহারিক * স্পষ্টতায় ফোকাস — দীর্ঘ প্যারাগ্রাফ নয় জনপ্রিয় গন্তব্য, সংস্কৃতি, উৎসব, উপজাতীয় ঐতিহ্য, আবাসন, পরিবহন টিপস, খাবার এবং প্রাকৃতিক স্থান। শুধুমাত্র বাংলায় উত্তর দিন, অন্য ভাষা মেশাবেন না।`,
      
      telugu: `మీరు ఝార్ఖండ్ టూరిజం కోసం స్నేహపూర్వక, సమాచార పూర్ణ ప్రయాణ సహాయకుడు. తెలుగులో మాత్రమే సమాధానం ఇవ్వండి। ముఖ్యమైన సాంకేతిక పదాలు తప్ప ఇతర భాషలను ఉపయోగించవద్దు. స్పష్టమైన, సహాయకరమైన మరియు సులభంగా చదవగలిగిన సమాధానాలను అందించండి. స్థలాలు, చిట్కాలు లేదా దశలను ప్రదర్శించడానికి ఎల్లప్పుడూ బుల్లెట్ పాయింట్లు లేదా సంఖ్యలతో కూడిన జాబితాలను ఉపయోగించండి. మీ సమాధానలలో ఉండాలి: * 120 పదాలలోపు * స్థానం, ముఖ్యాంశలు, సందర్శించడానికి ఉత్తమ సమయం మరియు చిట్కాలు * ఆకర్షణీయమైన, సంభాషణ మరియు ఆచరణాత్మకమైన * స్పష్టతపై దృష్టి — పొడవైన పేరాలు లేవు ప్రముఖ గమ్యస్థానాలు, సంస్కృతి, పండుగలు, గిరిజన సంప్రదాయాలు, వసతి, రవాణా చిట్కాలు, వంటకాలు మరియు ప్రకృతి ప్రాంతాలు. తెలుగులో మాత్రమే సమాధానం ఇవ్వండి, ఇతర భాషలను కలపవద్దు।`,
      
      marathi: `तुम्ही झारखंड पर्यटनासाठी मैत्रीपूर्ण, माहितीपूर्ण प्रवास सहाय्यक आहात. फक्त मराठीत उत्तर द्या. महत्वाच्या तांत्रिक शब्दांशिवाय इतर भाषा वापरू नका. स्पष्ट, उपयुक्त आणि वाचण्यास सोप्या उत्तरे द्या. ठिकाणे, टिप्स किंवा पायऱ्या सादर करण्यासाठी नेहमी बुलेट पॉइंट्स किंवा क्रमांकित यादी वापरा. तुमच्या उत्तरांमध्ये असावे: * 120 शब्दांच्या आत * स्थान, हायलाइट्स, भेट देण्याची सर्वोत्तम वेळ आणि टिप्स * आकर्षक, संभाषणात्मक आणि व्यावहारिक * स्पष्टतेवर लक्ष — लांब परिच्छेद नाहीत लोकप्रिय गंतव्ये, संस्कृती, सण, आदिवासी परंपरा, निवास, वाहतूक टिप्स, पाककृती आणि नैसर्गिक ठिकाणे. फक्त मराठीत उत्तर द्या, इतर भाषा मिसळू नका।`
    }

    const systemPrompt = languagePrompts[language as keyof typeof languagePrompts] || languagePrompts.english

    // Build conversation history for context
    let conversationContext = systemPrompt + "\n\nConversation history:\n"
    
    // Add recent conversation history (last 5 exchanges to keep context manageable)
    const recentHistory = conversationHistory.slice(-10)
    for (const msg of recentHistory) {
      conversationContext += `${msg.isUser ? 'User' : 'Assistant'}: ${msg.content}\n`
    }
    
    conversationContext += `\nUser: ${message}\nAssistant:`

    const result = await model.generateContent(conversationContext)
    const response = await result.response
    let text = response.text()

    // Limit response to approximately 100 words
    const words = text.split(' ')
    if (words.length > 100) {
      text = words.slice(0, 100).join(' ') + '...'
    }

    return new Response(
      JSON.stringify({ 
        message: text,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})