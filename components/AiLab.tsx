import React, { useState, useEffect } from 'react';
import { generateVeoVideo } from '../services/geminiService';
import { Glasses, Loader, Play, AlertCircle, Monitor, Smartphone } from 'lucide-react';

const AiLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  // Check for API Key selection availability
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else if (process.env.API_KEY) {
          // Fallback if hardcoded env (dev mode)
          setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success as per instruction
      setHasKey(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateVeoVideo(prompt, aspectRatio);
      setVideoUrl(url);
    } catch (err: any) {
      if (err.message && err.message.includes("Requested entity was not found")) {
          setHasKey(false); // Reset key state
          setError("Session expired. Please select API key again.");
      } else {
          setError(err.message || "Simulation failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="lab" className="py-20 border-t border-gray-800 bg-[#020202]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <div className="inline-block mb-6 p-4 border border-dashed border-gray-700 rounded-lg">
             <h2 className="text-2xl font-mono font-bold text-white flex items-center justify-center gap-3">
                <Glasses className="text-purple-500 animate-pulse" />
                R&D LAB: VEO GENERATOR
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-mono">EXPERIMENTAL PROTOTYPE // GEMINI VEO-3.1</p>
        </div>

        {!hasKey ? (
            <div className="bg-gray-900 p-8 rounded border border-gray-700 max-w-md mx-auto">
                <p className="text-gray-300 mb-6">Authorization required to access the Video Generation Terminal.</p>
                <button 
                    onClick={handleSelectKey}
                    className="bg-neon-cyan text-black font-bold py-2 px-6 rounded hover:bg-white transition-colors"
                >
                    INITIALIZE SECURITY KEY
                </button>
                 <p className="mt-4 text-xs text-gray-500">
                    Requires a paid GCP project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-neon-cyan">Docs</a>
                </p>
            </div>
        ) : (
            <div className="max-w-xl mx-auto">
                {/* Controls */}
                <div className="flex justify-center gap-4 mb-4">
                    <button 
                        onClick={() => setAspectRatio('16:9')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono border transition-all ${aspectRatio === '16:9' ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                    >
                        <Monitor size={14} /> LANDSCAPE (16:9)
                    </button>
                    <button 
                        onClick={() => setAspectRatio('9:16')}
                        className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono border transition-all ${aspectRatio === '9:16' ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan' : 'bg-black border-gray-700 text-gray-500 hover:border-gray-500'}`}
                    >
                        <Smartphone size={14} /> PORTRAIT (9:16)
                    </button>
                </div>

                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter simulation parameters (e.g., 'Cyberpunk city flyover at night')..."
                        className="w-full bg-black border border-gray-700 text-neon-cyan p-4 rounded focus:outline-none focus:border-neon-cyan font-mono text-sm h-32"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-600">{prompt.length} chars</div>
                </div>
                
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt}
                    className={`mt-4 w-full py-3 font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                        isLoading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                >
                    {isLoading ? <><Loader className="animate-spin" size={16}/> RENDERING...</> : <><Play size={16} /> RUN SIMULATION</>}
                </button>

                {error && (
                    <div className="mt-4 bg-red-900/20 border border-red-500 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {isLoading && (
                    <div className="mt-8 text-center">
                        <p className="text-neon-cyan font-mono text-xs animate-pulse">PROCESSING PHYSICS ENGINE... THIS MAY TAKE A MOMENT.</p>
                    </div>
                )}

                {videoUrl && (
                    <div className={`mt-8 mx-auto border-2 border-neon-cyan p-1 bg-neon-cyan/10 rounded shadow-[0_0_30px_rgba(168,85,247,0.4)] ${aspectRatio === '9:16' ? 'max-w-xs' : 'w-full'}`}>
                        <video controls autoPlay loop className="w-full rounded">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        )}

      </div>
    </section>
  );
};

export default AiLab;