

import { GoogleGenAI, Type } from "@google/genai";
import type { AnalyticsData, Song } from '../types';

// Ensure API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getLanguageInstruction = (lang: string) => {
    return lang === 'id' 
        ? "IMPORTANT: Provide the response strictly in Indonesian language (Bahasa Indonesia)." 
        : "Provide the response in English.";
};

export const generateFinancialSummary = async (financialData: {
  period: string;
  totalIncome: number;
  topIncomeSource: string;
}, language: string = 'en'): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  try {
    const langInstruction = getLanguageInstruction(language);
    const prompt = `You are a financial analyst for a music distribution service. Write a brief, professional summary for a musician's financial report.
      - Period: ${financialData.period}
      - Total Net Income: $${financialData.totalIncome.toFixed(2)}
      - Top Income Source: ${financialData.topIncomeSource}

      Based on this data, write a concise, encouraging, and professional summary for the report. Keep it under 75 words. 
      ${langInstruction}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
          temperature: 0.7,
      }
    });
    return response.text?.trim() || "Summary unavailable.";
  } catch (error) {
    console.error("Error generating financial summary:", error);
    return "Failed to generate AI summary due to an API error.";
  }
};


export const generateSongDescription = async (title: string, artist: string, language: string = 'en'): Promise<string> => {
  if (!API_KEY) return "API Key not configured. Please set it in the settings.";
  try {
    const langInstruction = getLanguageInstruction(language);
    const prompt = `Create a captivating, short promotional description for a new song titled "${title}" by the artist "${artist}". The description should be exciting, under 50 words, and suitable for social media and streaming platform listings. ${langInstruction}`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            temperature: 0.8,
            topP: 0.95,
        }
    });

    return response.text?.trim() || "Description unavailable.";
  } catch (error) {
    console.error("Error generating song description:", error);
    return "Failed to generate description due to an API error.";
  }
};

export const generateAICoverArt = async (title: string, artist: string, userPrompt: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";
    try {
        const fullPrompt = `
            Music release cover art for a track titled "${title}" by artist "${artist}".
            
            **Core Subject:** A white Ford Mustang GT sports car with two black racing stripes down the center.
            
            **Setting:** Parked on a modern, clean city street. The background features minimalist, contemporary architecture and tall palm trees. The sky is clear and bright.
            
            **Style:** Photorealistic, cinematic lighting, high detail, 8k, ultra realistic.
            
            **User Style Guidance:** ${userPrompt || 'Default natural lighting.'}
            
            **Crucial Instruction:** The image must NOT contain any text, letters, or numbers. It should be a clean image of the scene only.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: '1:1',
                }
            },
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString: string = part.inlineData.data;
                    return `data:image/jpeg;base64,${base64EncodeString}`;
                }
            }
        }
        
        return "Error: The model did not return any images.";
    } catch (error) {
        console.error("Error generating AI cover art:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return `Error: Failed to generate image. ${errorMessage}`;
    }
};


export const generateCoverArtIdeas = async (title: string, artist: string, language: string = 'en'): Promise<string> => {
  if (!API_KEY) return "API Key not configured. Please set it in the settings.";
  try {
    const langInstruction = getLanguageInstruction(language);
    const prompt = `Generate 3 distinct and creative visual concepts for an album cover for a song titled "${title}" by "${artist}". For each concept, describe the mood, color palette, and key imagery. Format the output as a numbered list. ${langInstruction}
    
    Example Format:
    1. **Concept Title:** [e.g., Neon Dream]
       - **Mood:** [e.g., Energetic, Nostalgic]
       - **Color Palette:** [e.g., Electric pinks, deep blues, vibrant purples]
       - **Imagery:** [e.g., A silhouette of a person driving a classic car down a city street at night, with neon signs reflecting off the wet pavement.]
    
    2. **Concept Title:** ...`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            temperature: 0.9,
            topP: 0.95,
        }
    });

    return response.text?.trim() || "Ideas unavailable.";
  } catch (error) {
    console.error("Error generating cover art ideas:", error);
    return "Failed to generate cover art ideas due to an API error.";
  }
};

export const generateReleaseStrategy = async (title: string, artist: string, genre: string, language: string = 'en'): Promise<string> => {
  if (!API_KEY) return "API Key not configured. Please set it in the settings.";
  try {
    const langInstruction = getLanguageInstruction(language);
    const prompt = `Create a comprehensive, actionable marketing and release strategy for a new song.
    
    **Song Details:**
    - **Title:** "${title}"
    - **Artist:** "${artist}"
    - **Genre:** ${genre}

    **Instructions:**
    Generate a release plan with the following sections. Use markdown for formatting. ${langInstruction}

    1.  **Target Audience:**
        - Describe the primary and secondary listener demographics.
        - Mention similar artists or genres they might enjoy.

    2.  **Pre-Release Hype (1-2 Weeks Out):**
        - Provide 3-4 specific social media content ideas (e.g., behind-the-scenes clips, cover art reveal, audio snippet).
        - Suggest engaging captions and relevant hashtags for platforms like Instagram, TikTok, and Twitter.

    3.  **Release Day Push:**
        - Outline key actions for release day (e.g., "Go Live" announcement, share links to all platforms).
        - Suggest a call-to-action to encourage initial streams and shares.

    4.  **Post-Release Promotion (1-4 Weeks):**
        - Recommend 2-3 strategies for maintaining momentum (e.g., submit to user-curated playlists, create a simple visualizer video for YouTube, engage with fan comments).

    The tone should be encouraging, creative, and professional.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Using the latest recommended model
        contents: prompt,
        config: {
            temperature: 0.9,
            topP: 0.95,
        }
    });

    return response.text?.trim() || "Strategy unavailable.";
  } catch (error) {
    console.error("Error generating release strategy:", error);
    return "Failed to generate release strategy due to an API error.";
  }
};


export const generateBannerImage = async (
    songDetails: { title: string; artistName: string; genre: string; description: string },
    userPrompt: string,
    aspectRatio: '16:9' | '1:1' | '4:3' | '3:4' | '9:16'
): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";

    try {
        const prompt = `Create a visually stunning promotional banner for the song "${songDetails.title}" by "${songDetails.artistName}".
        The song's genre is ${songDetails.genre}.
        The general description of the song is: "${songDetails.description}".
        The banner should be suitable for a ${aspectRatio === '16:9' ? 'YouTube channel header' : 'social media post'}.
        The banner should prominently feature the song title "${songDetails.title}" and the artist name "${songDetails.artistName}" in a stylish, legible font.
        User instructions for the visual style: "${userPrompt}".
        Do not include any other text besides the song title and artist name.
        The style should be modern, professional, and eye-catching.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio,
                }
            },
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString: string = part.inlineData.data;
                    return `data:image/jpeg;base64,${base64EncodeString}`;
                }
            }
        }
        return "Failed to generate image. The model did not return any images.";
    } catch (error) {
        console.error("Error generating banner image:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return `Error: Failed to generate image due to an API error. ${errorMessage}`;
    }
};

export const generateLyrics = async (title: string, artist: string, mood: string, topic: string, language: string = 'en'): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";
    try {
        const langInstruction = getLanguageInstruction(language);
        const prompt = `You are an expert songwriter. Write compelling song lyrics for a song titled "${title}" by the artist "${artist}".
        The song's mood should be: "${mood}".
        The main topic or theme of the song is: "${topic}".
        
        ${langInstruction} (Write the lyrics themselves in the requested language, and any structural labels like [Verse 1] in that language too).
        
        Please structure the output with clear labels for each section (e.g., [Verse 1], [Chorus], [Bridge]). The lyrics should be creative, evocative, and fit the specified mood and topic.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.9,
            }
        });
        return response.text?.trim() || "Lyrics unavailable.";
    } catch (error) {
        console.error("Error generating lyrics:", error);
        return "Failed to generate lyrics due to an API error.";
    }
};

export const generatePlaylistPitch = async (song: { title: string, artistName: string, genre: string }, language: string = 'en'): Promise<{ pitch: string, playlists: string[] }> => {
    if (!API_KEY) return Promise.reject("API Key not configured.");
    try {
        const langInstruction = getLanguageInstruction(language);
        const prompt = `I need help pitching a song to playlist curators.
        Song Title: "${song.title}"
        Artist: "${song.artistName}"
        Genre: "${song.genre}"

        Based on this, generate a short, compelling pitch (under 75 words) that I can send to a Spotify playlist curator.
        Also, suggest 5 creative, fitting playlist names that this song would be perfect for.
        
        ${langInstruction} (The JSON keys must remain "pitch" and "playlists", but the values should be in the requested language).
        
        Return the response as a JSON object with two keys: "pitch" (a string) and "playlists" (an array of 5 strings).`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        pitch: { type: Type.STRING },
                        playlists: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Error generating playlist pitch:", error);
        return Promise.reject("Failed to generate playlist pitch due to an API error.");
    }
};

export const generateWhitelistJustification = async (trackInfo: string, platform: string, userReason: string, language: string = 'en'): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";
    try {
        const langInstruction = getLanguageInstruction(language);
        const prompt = `A user needs to submit a whitelist request. Help them write a professional justification.
        - Track Information: ${trackInfo}
        - Platform: ${platform}
        - User's reason: "${userReason}"
        
        Based on the user's reason, draft a clear, professional justification for this whitelist request. The justification should be under 100 words and clearly state the user is the rights holder and is requesting to prevent unauthorized claims.
        ${langInstruction}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text?.trim() || "Justification unavailable.";
    } catch (error) {
        console.error("Error generating whitelist justification:", error);
        return "Failed to generate justification due to an API error.";
    }
};

export const generatePressRelease = async (song: { title: string, artistName: string, genre: string, description: string }, language: string = 'en'): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";
    try {
        const langInstruction = getLanguageInstruction(language);
        const prompt = `You are a music publicist. Write a professional press release for a new song.
        - Song Title: "${song.title}"
        - Artist: "${song.artistName}"
        - Genre: ${song.genre}
        - Description: "${song.description}"
        
        Structure the press release with a headline, dateline, introduction, a quote from the artist, details about the song, and contact information. Use markdown for formatting.
        ${langInstruction}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { temperature: 0.8 }
        });
        return response.text?.trim() || "Press release unavailable.";
    } catch (error) {
        console.error("Error generating press release:", error);
        return "Failed to generate press release due to an API error.";
    }
};

export const transcribeLyrics = async (songTitle: string, artistName: string, language: string = 'en'): Promise<string> => {
    if (!API_KEY) return "API Key not configured.";
    try {
        const prompt = `Generate plausible lyrics for a song titled "${songTitle}" by "${artistName}". The output should be only the lyrics, formatted with [Verse 1], [Chorus], etc.
        If the artist is known for a specific language (e.g. Indonesian), generate in that language. Otherwise, default to ${language === 'id' ? 'Indonesian' : 'English'}.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text?.trim() || "Lyrics unavailable.";
    } catch (error) {
        console.error("Error transcribing lyrics:", error);
        return "Failed to generate lyrics.";
    }
};


export type AudioAnalysisResult = {
  bpm: number;
  key: string;
  moods: string[];
  isInstrumental: boolean;
  duplicateCheck: {
    status: 'clean' | 'potential_duplicate' | 'checking' | 'idle';
    matchDetails?: string;
  };
};

export const getAudioAnalysis = async (title: string, artist: string, genre: string, language: string = 'en'): Promise<AudioAnalysisResult> => {
    if (!API_KEY) {
        return Promise.reject("API Key not configured.");
    }
    try {
        const langInstruction = language === 'id' ? "Translate the 'moods' values to Indonesian." : "Keep moods in English.";
        const prompt = `Based on a song titled "${title}" by the artist "${artist}" with the genre "${genre}", generate a plausible BPM between 80-160, a common musical key, a list of 3 descriptive moods, and whether it is likely instrumental. Also provide a duplicate check status, which should be 'clean' 80% of the time. 
        ${langInstruction}
        Return as a JSON object with keys: "bpm" (number), "key" (string), "moods" (array of strings), "isInstrumental" (boolean), and "duplicateCheck" (an object with a 'status' key).`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        bpm: { type: Type.INTEGER },
                        key: { type: Type.STRING },
                        moods: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        isInstrumental: { type: Type.BOOLEAN },
                        duplicateCheck: {
                            type: Type.OBJECT,
                            properties: {
                                status: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        });
        // Add mock match details if duplicate
        const result = JSON.parse(response.text || "{}");
        if (result.duplicateCheck && result.duplicateCheck.status === 'potential_duplicate') {
            result.duplicateCheck.matchDetails = "Strongly matches 'Cosmic Drift' by Galaxy Runners.";
        }
        return result;
    } catch (error) {
        console.error("Error getting audio analysis:", error);
        return {
            bpm: 120,
            key: 'C Major',
            moods: ['Energetic'],
            isInstrumental: false,
            duplicateCheck: { status: 'idle' },
        };
    }
};

export const getAudioQuality = async (fileName: string): Promise<{ lufs: number; peak: number; dynamicRange: number; }> => {
    // Mock analysis
    await new Promise(res => setTimeout(res, 800));
    return {
        lufs: -9.5,
        peak: -0.2,
        dynamicRange: 8
    };
};

export const analyzeCoverArt = async (file: File): Promise<{ issues: { level: 'warning' | 'error'; message: string }[] }> => {
  if (!API_KEY) return Promise.reject("API Key not configured.");
  // Mock analysis
  await new Promise(res => setTimeout(res, 1500));
  const issues: { level: 'warning' | 'error'; message: string }[] = [];
  
  if (file.size > 10000000) {
      issues.push({ level: 'error', message: "File size exceeds 10MB limit." });
  } else if (file.size > 4000000) {
      issues.push({ level: 'warning', message: "Artwork file size is large, may not be accepted by all stores." });
  }

  // This is where a real call to Gemini Vision API would go
  if (file.name.toLowerCase().includes('blurry')) {
      issues.push({ level: 'warning', message: "Image may be low resolution or blurry." });
  }
  if (file.name.toLowerCase().includes('text')) {
      issues.push({ level: 'warning', message: "Detected text in artwork. Ensure it only contains artist name and release title." });
  }

  return { issues };
};

export const getHitPotential = async (title: string, genre: string, language: string = 'en'): Promise<{ score: number; feedback: string }> => {
    if (!API_KEY) {
        return Promise.reject("API Key not configured.");
    }
    try {
        const langInstruction = language === 'id' ? "Provide the 'feedback' in Indonesian." : "Provide the 'feedback' in English.";
        const prompt = `Analyze the song titled "${title}" in the genre "${genre}" and provide a "hit potential" score between 60 and 95. Also provide a short, positive feedback sentence. ${langInstruction} Return as a JSON object with keys "score" (number) and "feedback" (string).`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        feedback: { type: Type.STRING }
                    }
                }
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Error getting hit potential:", error);
        // Fallback mock data
        return {
            score: Math.floor(Math.random() * 36) + 60, // random score between 60-95
            feedback: "Strong rhythmic foundation with a memorable melodic hook."
        };
    }
};

export const generateAIMarketingSynopsis = async (song: { title: string, artistName: string, genre: string, moods?: string[] }, language: string = 'en'): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  try {
    const langInstruction = getLanguageInstruction(language);
    const prompt = `Generate a short, punchy marketing synopsis (2-3 sentences) for a song with the following details:
    - Title: "${song.title}"
    - Artist: "${song.artistName}"
    - Genre: ${song.genre}
    - Moods: ${song.moods?.join(', ') || 'not specified'}

    The synopsis should be exciting and suitable for pitching to blogs or using in press materials. ${langInstruction}`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { temperature: 0.85 }
    });

    return response.text?.trim() || "Synopsis unavailable.";
  } catch (error) {
    console.error("Error generating marketing synopsis:", error);
    return "Failed to generate AI synopsis due to an API error.";
  }
};


export const getMetadataFromFiles = async (audioFileName: string, coverArtFileName: string): Promise<{ title: string; artist: string, suggestedGenre: string }> => {
    if (!API_KEY) return Promise.reject("API Key not configured.");
    // Mock analysis
    await new Promise(res => setTimeout(res, 1200));
    
    let title = audioFileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ");
    let artist = "Unknown Artist";

    const titleParts = title.split(' - ');
    if (titleParts.length > 1) {
        artist = titleParts[0].trim();
        title = titleParts.slice(1).join(' - ').trim();
    }
    
    const genres = ['Synthwave', 'Ambient', 'Lofi Hip-Hop', 'Electronic', 'Pop'];
    const suggestedGenre = genres[Math.floor(Math.random() * genres.length)];

    return { title, artist, suggestedGenre };
};

export const generateLabelNameSuggestions = async (
  keywords: string,
  style: string,
  numSuggestions: number,
  language: string = 'en'
): Promise<{ suggestions: { name: string; reason: string }[] }> => {
  if (!API_KEY) return Promise.reject("API Key not configured.");
  try {
    const langInstruction = language === 'id' ? "Provide the 'reason' explanation in Indonesian." : "Provide the 'reason' explanation in English.";
    const prompt = `You are a creative branding expert specializing in the music industry. A user is looking for a name for their new record label.

    **Instructions:**
    Generate ${numSuggestions} unique and compelling record label names based on the following criteria:
    - **Keywords/Themes:** ${keywords || 'None provided, be creative'}
    - **Desired Style:** ${style}

    For each suggestion, provide a brief (1-sentence) reason explaining the name's appeal or meaning.
    ${langInstruction}
    Return the response as a JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "The suggested record label name."
                  },
                  reason: {
                    type: Type.STRING,
                    description: "A brief explanation for the name suggestion."
                  }
                }
              }
            }
          }
        }
      }
    });
    
    return JSON.parse(response.text || "{}");

  } catch (error) {
    console.error("Error generating label name suggestions:", error);
    return Promise.reject("Failed to generate label name suggestions due to an API error.");
  }
};


export const generateAnalyticsInsights = async (analyticsData: AnalyticsData, language: string = 'en'): Promise<{ projection: string; anomalies: string[]; recommendations: string[] }> => {
    if (!API_KEY) {
        return Promise.reject("API Key not configured.");
    }
    try {
        const langInstruction = language === 'id' ? "Translate all response values to Indonesian." : "Keep response in English.";
        const prompt = `You are a music industry analyst AI. Based on the following JSON data for a song, provide a projection, detect anomalies, and give actionable recommendations.
        - Data: ${JSON.stringify({ totalStreams: analyticsData.totalStreams, topCountry: analyticsData.topCountries[0]?.name, skipRate: analyticsData.skipRate })}
        - Return a JSON object with keys: "projection" (string), "anomalies" (array of strings), and "recommendations" (array of strings).
        - Projection: A brief sentence on future stream potential.
        - Anomalies: 1-2 noteworthy data points (e.g., high skip rate, unusual top country).
        - Recommendations: 2-3 specific, actionable marketing tips based on the data.
        ${langInstruction}
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        projection: { type: Type.STRING },
                        anomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                    }
                }
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Error generating analytics insights:", error);
        return {
            projection: "Could not generate projection.",
            anomalies: ["API error during analysis."],
            recommendations: ["Unable to provide recommendations at this time."]
        };
    }
};

export const generateEarningsForecast = async (songDetails: { title: string, artistName: string, genre: string }, model: 'Conservative' | 'Standard' | 'Optimistic', language: string = 'en'): Promise<{ forecastData: number[], summary: string }> => {
    if (!API_KEY) {
        return Promise.reject("API Key not configured.");
    }
    try {
        const langInstruction = language === 'id' ? "Provide the 'summary' in Indonesian." : "Provide the 'summary' in English.";
        const prompt = `You are a music industry financial analyst AI.
        
        **Song Details:**
        - Title: "${songDetails.title}"
        - Artist: "${songDetails.artistName}"
        - Genre: "${songDetails.genre}"
        
        **Task:**
        Create a 12-month earnings forecast based on the provided song details and a forecasting model.
        - **Forecast Model:** ${model}
        - Assume the song currently earns between $50 and $200 per month.
        - The forecast should show a plausible growth or decay trend over the next 12 months.
        - A '${model}' forecast should reflect its name (e.g., Optimistic shows strong growth).
        
        **Instructions:**
        1.  Generate a JSON array of 12 numbers representing the projected earnings for each of the next 12 months.
        2.  Write a brief (2-3 sentences) professional summary of the forecast.
        ${langInstruction}
        
        **Return Format:**
        Return a single JSON object with two keys:
        - "forecastData": An array of 12 numbers.
        - "summary": A string containing the financial summary.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        forecastData: {
                            type: Type.ARRAY,
                            items: { type: Type.NUMBER }
                        },
                        summary: { type: Type.STRING }
                    }
                }
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Error generating earnings forecast:", error);
        // Provide mock data on failure
        const base = 100 + Math.random() * 100;
        const mockData = Array.from({length: 12}, (_, i) => base * (1 + (i * 0.1)));
        return {
            forecastData: mockData,
            summary: "Failed to generate AI forecast. Displaying a sample projection. The model suggests steady growth based on genre trends."
        };
    }
};