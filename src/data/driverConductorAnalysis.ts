
export interface DriverConductorAnalysis {
  result: string;
  outcome: string;
  struggleEndAge: string;
  destinyRatio: string;
}

export const driverConductorAnalysisData: Record<number, Record<number, DriverConductorAnalysis>> = {
  1: {
    1: { result: "Neutral", outcome: "Strong leadership, but ego clashes, lonely path", struggleEndAge: "33 – 36 Age", destinyRatio: "90%" },
    2: { result: "❌ Challenging", outcome: "Emotional imbalance; dominance vs diplomacy", struggleEndAge: "34 – 37 Age", destinyRatio: "70%" },
    3: { result: "✅ Good", outcome: "Confident, creative leader; excellent communicator", struggleEndAge: "30 – 33 Age", destinyRatio: "70%" },
    4: { result: "Neutral", outcome: "Hardworking but rigid; emotionally distant", struggleEndAge: "38 – 42 Age", destinyRatio: "80%" },
    5: { result: "✅ Good", outcome: "Dynamic, charming leader; success in business", struggleEndAge: "34 – 36 Age", destinyRatio: "80%" },
    6: { result: "❌ Challenging", outcome: "Dominates in love, ego blocks bonding", struggleEndAge: "36 – 39 Age", destinyRatio: "70%" },
    7: { result: "Neutral", outcome: "Intellectual path; spiritual lessons; isolation", struggleEndAge: "40 – 44 Age", destinyRatio: "50%" },
    8: { result: "Neutral", outcome: "Ambitious, karmic path; late success.", struggleEndAge: "39 – 43 Age", destinyRatio: "00%" },
    9: { result: "✅ Good", outcome: "Selfless leader; spiritual and emotional journey", struggleEndAge: "32 – 35 Age", destinyRatio: "100%" }
  },
  2: {
    1: { result: "Neutral", outcome: "Sensitive to control; needs harmony in relationships", struggleEndAge: "34 – 36 Age", destinyRatio: "80%" },
    2: { result: "❌ Challenging", outcome: "Over-sensitive, emotional confusion, indecisiveness", struggleEndAge: "35 – 38 Age", destinyRatio: "30%" },
    3: { result: "✅ Good", outcome: "Emotional yet expressive; family-oriented, Moody", struggleEndAge: "33 – 36 Age", destinyRatio: "50%" },
    4: { result: "Neutral", outcome: "Security-loving but rigid, Emotion meets stability;", struggleEndAge: "38 – 42 Age", destinyRatio: "20%" },
    5: { result: "Neutral", outcome: "Restless in love, inconsistent relationships", struggleEndAge: "34 – 37 Age", destinyRatio: "60%" },
    6: { result: "✅ Good", outcome: "Nurturing, romantic, ideal for marriage and love", struggleEndAge: "36 – 39 Age", destinyRatio: "20%" },
    7: { result: "❌ Challenging", outcome: "Strained bonds, Spiritual-emotional mismatch;", struggleEndAge: "40 – 44 Age", destinyRatio: "60%" },
    8: { result: "❌ Challenging", outcome: "Emotionally burdened; family/karmic tension", struggleEndAge: "39 – 43 Age", destinyRatio: "00%" },
    9: { result: "Neutral", outcome: "Generous but emotionally burdened, Mood Swing", struggleEndAge: "34 – 36 Age", destinyRatio: "10%" }
  },
  3: {
    1: { result: "✅ Good", outcome: "Charismatic speaker; success in media, Leadership", struggleEndAge: "30 – 33 Age", destinyRatio: "90%" },
    2: { result: "Neutral", outcome: "Emotional creativity, good bonding, Mood swing", struggleEndAge: "32 – 35 Age", destinyRatio: "40%" },
    3: { result: "❌ Challenging", outcome: "Scattered Energy, over-talkative", struggleEndAge: "30 – 32 Age", destinyRatio: "60%" },
    4: { result: "Neutral", outcome: "Creative with structure; overly critical tendencies", struggleEndAge: "36 – 40 Age", destinyRatio: "50%" },
    5: { result: "✅ Good", outcome: "Social, Playful, Networking magnet, Playful, Versatile", struggleEndAge: "32 – 34 Age", destinyRatio: "60%" },
    6: { result: "✅ Good", outcome: "Artistic, romantic, balanced life", struggleEndAge: "34 – 37 Age", destinyRatio: "00%" },
    7: { result: "Neutral", outcome: "Spiritual artist, philosophical, needs emotional grounding", struggleEndAge: "38 – 42 Age", destinyRatio: "70%" },
    8: { result: "❌ Challenging", outcome: "Creative blocks due to karmic delay", struggleEndAge: "39 – 43 Age", destinyRatio: "40%" },
    9: { result: "✅ Good", outcome: "Expressive, Visionary; creative with spiritual touch", struggleEndAge: "32 – 35 Age", destinyRatio: "60%" }
  },
  4: {
    1: { result: "Neutral", outcome: "Practical but stiff; power struggle, controlling tendencies", struggleEndAge: "38 – 42 Age", destinyRatio: "80%" },
    2: { result: "Neutral", outcome: "Rigid emotions, needs flexibility", struggleEndAge: "37 – 40 Age", destinyRatio: "2%" },
    3: { result: "Neutral", outcome: "Analytical with creative edge; balanced, Cautious success", struggleEndAge: "35 – 38 Age", destinyRatio: "30%" },
    4: { result: "❌ Challenging", outcome: "Over-disciplined, lacks adaptability and spontaneity", struggleEndAge: "42 – 46 Age", destinyRatio: "20%" },
    5: { result: "Neutral", outcome: "Smart but lacks consistency, struggles with restlessness", struggleEndAge: "37 – 39 Age", destinyRatio: "50%" },
    6: { result: "✅ Good", outcome: "Responsible family provider, grounded emotions", struggleEndAge: "38 – 42 Age", destinyRatio: "60%" },
    7: { result: "❌ Challenging", outcome: "Intellectual blockages; Mental tension, isolation, late success", struggleEndAge: "42 – 45 Age", destinyRatio: "90%" },
    8: { result: "❌ Challenging", outcome: "Hard work, long struggle, late success", struggleEndAge: "43 – 46 Age", destinyRatio: "00%" },
    9: { result: "Neutral", outcome: "Structured humanitarian; emotionally detached", struggleEndAge: "36 – 39 Age", destinyRatio: "00%" }
  },
  5: {
    1: { result: "✅ Good", outcome: "Influential leader with charm and energy", struggleEndAge: "34 – 36 Age", destinyRatio: "70%" },
    2: { result: "Neutral", outcome: "Expressive but emotionally inconsistent", struggleEndAge: "34 – 37 Age", destinyRatio: "70%" },
    3: { result: "✅ Good", outcome: "Creative, vibrant, good in sales/media Highly social", struggleEndAge: "32 – 35 Age", destinyRatio: "70%" },
    4: { result: "Neutral", outcome: "Multi-talented but scattered focus", struggleEndAge: "36 – 39 Age", destinyRatio: "50%" },
    5: { result: "❌ Challenging", outcome: "Overactive mind; restless, lacks stability & Focus, Distracted", struggleEndAge: "34 – 36 Age", destinyRatio: "60%" },
    6: { result: "✅ Good", outcome: "Romantic, sensual; lucky in relationships, magnetic personality", struggleEndAge: "36 – 39 Age", destinyRatio: "70%" },
    7: { result: "Neutral", outcome: "Spiritually curious, Intellectual but emotionally unstable", struggleEndAge: "38 – 42 Age", destinyRatio: "50%" },
    8: { result: "❌ Challenging", outcome: "Unstable ambition, karmic delays, struggles in middle life", struggleEndAge: "39 – 43 Age", destinyRatio: "70%" },
    9: { result: "Neutral", outcome: "Talkative, Philanthropic energy, Unstable desires", struggleEndAge: "34 – 37 Age", destinyRatio: "50%" }
  },
  6: {
    1: { result: "❌ Challenging", outcome: "Loving but dominating; emotional tension in marriage", struggleEndAge: "36 – 39 Age", destinyRatio: "70%" },
    2: { result: "✅ Good", outcome: "Romantic and nurturing; peaceful domestic life", struggleEndAge: "36 – 39 Age", destinyRatio: "40%" },
    3: { result: "✅ Good", outcome: "Artistic harmony and expression; well-suited for design/art", struggleEndAge: "34 – 37 Age", destinyRatio: "00%" },
    4: { result: "Neutral", outcome: "Responsible but emotionally burdened early in life", struggleEndAge: "38 – 41 Age", destinyRatio: "60%" },
    5: { result: "✅ Good", outcome: "Adventurous in love, good for social life, Attractive personality", struggleEndAge: "36 – 39 Age", destinyRatio: "70%" },
    6: { result: "❌ Challenging", outcome: "Over-responsibility, suffocation in family, Emotional drain", struggleEndAge: "37 – 40 Age", destinyRatio: "80%" },
    7: { result: "❌ Challenging", outcome: "Emotional sacrifice, tension in love, Spiritual-emotional burden;", struggleEndAge: "38 – 42 Age", destinyRatio: "70%" },
    8: { result: "❌ Challenging", outcome: "Family burdened with karma; duties overpower desires", struggleEndAge: "39 – 43 Age", destinyRatio: "60%" },
    9: { result: "✅ Good", outcome: "Spiritual healer; love through service", struggleEndAge: "36 – 38 Age", destinyRatio: "30%" }
  },
  7: {
    1: { result: "Neutral", outcome: "Detached thinker with leadership qualities, visionary", struggleEndAge: "40 – 44 Age", destinyRatio: "60%" },
    2: { result: "❌ Challenging", outcome: "Emotionally disconnected; relationship issues", struggleEndAge: "38 – 42 Age", destinyRatio: "40%" },
    3: { result: "Neutral", outcome: "Spiritual speaker, deep thinker; can be good in academics/art", struggleEndAge: "36 – 39 Age", destinyRatio: "70%" },
    4: { result: "❌ Challenging", outcome: "Over-analytical; late success; isolation", struggleEndAge: "40 – 45 Age", destinyRatio: "80%" },
    5: { result: "Neutral", outcome: "Deep thinker, mentally scattered, seeks freedom; needs balance", struggleEndAge: "37 – 41 Age", destinyRatio: "60%" },
    6: { result: "❌ Challenging", outcome: "Emotionally burdened, Spiritual detachment from worldly duties", struggleEndAge: "39 – 43 Age", destinyRatio: "80%" },
    7: { result: "❌ Challenging", outcome: "Too much introspection, lonely path; prone to isolation or anxiety", struggleEndAge: "45 – 48 Age", destinyRatio: "50%" },
    8: { result: "❌ Challenging", outcome: "Spiritual with karmic blocks; severe delays, Karma-heavy intellect", struggleEndAge: "42 – 46 Age", destinyRatio: "40%" },
    9: { result: "✅ Good", outcome: "Highly spiritual, Enlightened soul, gives to society & sacrifices for others", struggleEndAge: "38 – 42 Age", destinyRatio: "40%" }
  },
  8: {
    1: { result: "Neutral", outcome: "High achiever with ego; must act ethically", struggleEndAge: "39 – 43 Age", destinyRatio: "00%" },
    2: { result: "❌ Challenging", outcome: "Emotional burden, blocked expression; karma in family life", struggleEndAge: "38 – 42 Age", destinyRatio: "00%" },
    3: { result: "Neutral", outcome: "Powerful speaker with authority, moody, but struggles emotionally", struggleEndAge: "36 – 39 Age", destinyRatio: "50%" },
    4: { result: "❌ Challenging", outcome: "Rigid thinking, Karmic burden; heavy responsibility and delay", struggleEndAge: "42 – 46 Age", destinyRatio: "00%" },
    5: { result: "❌ Challenging", outcome: "Powerful but restless achiever; lack of peace", struggleEndAge: "38 – 41 Age", destinyRatio: "70%" },
    6: { result: "❌ Challenging", outcome: "Family baggage Burdens; dominating in relationships", struggleEndAge: "40 – 43 Age", destinyRatio: "60%" },
    7: { result: "❌ Challenging", outcome: "Spiritual struggle, Struggles with mental peace; past life karma", struggleEndAge: "42 – 46 Age", destinyRatio: "40%" },
    8: { result: "❌ Challenging", outcome: "Severe karmic life, extreme delays, setbacks", struggleEndAge: "44 – 48 Age", destinyRatio: "20%" },
    9: { result: "❌ Challenging", outcome: "Overgiving, burnout, spiritual debt", struggleEndAge: "40 – 43 Age", destinyRatio: "20%" }
  },
  9: {
    1: { result: "Neutral", outcome: "Visionary but emotional; needs discipline.", struggleEndAge: "32 – 35 Age", destinyRatio: "80%" },
    2: { result: "❌ Challenging", outcome: "Over-giving, drains energy, Too emotional; suffers due to others", struggleEndAge: "34 – 37 Age", destinyRatio: "20%" },
    3: { result: "✅ Good", outcome: "Creative humanitarian, joyful speaker, Visionary", struggleEndAge: "32 – 35 Age", destinyRatio: "50%" },
    4: { result: "Neutral", outcome: "Responsible, Humanitarian with structure; late growth", struggleEndAge: "36 – 39 Age", destinyRatio: "20%" },
    5: { result: "Neutral", outcome: "Spiritual traveller, restless", struggleEndAge: "34 – 36 Age", destinyRatio: "60%" },
    6: { result: "✅ Good", outcome: "Nurturing and emotional healer, strong family support", struggleEndAge: "36 – 39 Age", destinyRatio: "40%" },
    7: { result: "✅ Good", outcome: "Mystical, selfless, Spiritual path; renunciation and enlightenment", struggleEndAge: "38 – 42 Age", destinyRatio: "40%" },
    8: { result: "❌ Challenging", outcome: "Burnout from karmic burden and emotional struggle", struggleEndAge: "40 – 44 Age", destinyRatio: "20%" },
    9: { result: "❌ Challenging", outcome: "Self-sacrificing, emotionally weak; needs to guard personal health", struggleEndAge: "36 – 38 Age", destinyRatio: "20%" }
  }
};

export const getDriverConductorAnalysis = (driver: number, conductor: number): DriverConductorAnalysis | null => {
  if (driver >= 1 && driver <= 9 && conductor >= 1 && conductor <= 9) {
    return driverConductorAnalysisData[driver]?.[conductor] || null;
  }
  return null;
};
