import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [genre, setGenre] = useState('sci-fi');
  const [voiceModel, setVoiceModel] = useState('default');
  const [paths, setPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [generatedStory, setGeneratedStory] = useState('');
  const [partTwo, setPartTwo] = useState('');
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const generatePaths = () => {
    const samplePaths = [
      `A ${genre} tale where ${characterName || 'you'} stumble into a mystery.`,
      `${characterName || 'You'} awaken in a world that defies all logic.`,
      `Time splits as ${characterName || 'you'} unlock a forbidden power.`
    ];
    setPaths(samplePaths);
    setStep(2);
  };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setGeneratedStory(`In a world shaped by ${genre}, ${path.toLowerCase()} What follows is an unforgettable journey...`);
    setStep(3);
  };

  const handlePlayAudio = () => {
    const audio = new Audio('/audio/story-preview.mp3');
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  const handleContinue = () => {
    setPartTwo(`${characterName || 'The hero'} faces a choice that will echo across universes...`);
  };

  const handleRestart = () => {
    setPrompt('');
    setCharacterName('');
    setGenre('sci-fi');
    setVoiceModel('default');
    setPaths([]);
    setSelectedPath(null);
    setGeneratedStory('');
    setPartTwo('');
    setStep(1);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#1C1C1C',
      color: '#F5F5F5',
      borderRadius: '1rem'
    }}>
      <h1 style={{ color: '#FF6B00', textAlign: 'center', fontSize: '2rem' }}>KukuKreate</h1>
      <p style={{ color: '#FFD6B3', textAlign: 'center' }}>Create your own audio story with AI</p>

      {step === 1 && (
        <div style={{ marginTop: '2rem' }}>
          <label>Main Story Prompt:</label>
          <textarea
            placeholder="e.g., I want a sci-fi story about time travel"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: '100%', height: '80px', marginBottom: '1rem', backgroundColor: '#333', color: 'white', border: '1px solid #FF6B00' }}
          />
          <label>Main Character Name:</label>
          <input
            type="text"
            placeholder="e.g., Zara"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#333', color: 'white', border: '1px solid #FF6B00' }}
          />
          <label>Select Genre:</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#333', color: 'white', border: '1px solid #FF6B00' }}>
            <option value="sci-fi">Sci-Fi</option>
            <option value="romance">Romance</option>
            <option value="mystery">Mystery</option>
            <option value="fantasy">Fantasy</option>
            <option value="comedy">Comedy</option>
          </select>
          <label>Select Voice Model:</label>
          <select value={voiceModel} onChange={(e) => setVoiceModel(e.target.value)} style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#333', color: 'white', border: '1px solid #FF6B00' }}>
            <option value="default">Default</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="narrator">Narrator</option>
          </select>
          <button
            onClick={generatePaths}
            disabled={!prompt.trim()}
            style={{ backgroundColor: '#FF6B00', color: 'white', padding: '0.75rem', width: '100%', border: 'none', borderRadius: '0.5rem' }}
          >
            Generate Story Paths
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: '#FFD6B3' }}>Choose how your story begins:</p>
          {paths.map((path, index) => (
            <button
              key={index}
              onClick={() => handlePathSelect(path)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: selectedPath === path ? '#FF6B00' : 'white',
                color: selectedPath === path ? 'white' : '#FF6B00',
                border: '1px solid #FF6B00',
                borderRadius: '0.5rem'
              }}
            >
              {path}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#FF6B00' }}>Your Custom Story</h3>
          <p style={{ marginBottom: '1rem' }}>{generatedStory}</p>
          {partTwo && <p style={{ fontStyle: 'italic', color: '#FFD6B3' }}>{partTwo}</p>}
          <button onClick={handlePlayAudio} disabled={isPlaying} style={{ marginRight: '0.5rem', backgroundColor: '#FFD6B3', color: '#1C1C1C', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.3rem' }}>
            🔊 {isPlaying ? 'Playing...' : 'Listen to Audio Preview'}
          </button>
          <button onClick={handleContinue} style={{ marginRight: '0.5rem', backgroundColor: '#FF6B00', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.3rem' }}>
            Continue the Story
          </button>
          <button onClick={handleRestart} style={{ background: 'transparent', border: 'none', color: '#FFD6B3', textDecoration: 'underline' }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
