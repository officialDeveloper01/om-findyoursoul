export interface DriverConductorAnalysis {
  result: string;
  outcome: string;
}

export const driverConductorAnalysisData: Record<number, Record<number, DriverConductorAnalysis>> = {
  1: {
    1: { result: "Neutral", outcome: "Strong leadership, but ego clashes, lonely path" },
    2: { result: "❌ Challenging", outcome: "Emotional imbalance; dominance vs diplomacy" },
    3: { result: "✅ Good", outcome: "Confident, creative leader; excellent communicator" },
    4: { result: "Neutral", outcome: "Hardworking but rigid; emotionally distant" },
    5: { result: "✅ Good", outcome: "Dynamic, charming leader; success in business" },
    6: { result: "❌ Challenging", outcome: "Dominates in love, ego blocks bonding" },
    7: { result: "Neutral", outcome: "Intellectual path; spiritual lessons; isolation" },
    8: { result: "Neutral", outcome: "Ambitious, karmic path; late success." },
    9: { result: "✅ Good", outcome: "Selfless leader; spiritual and emotional journey" }
  },
  2: {
    1: { result: "Neutral", outcome: "Sensitive to control; needs harmony in relationships" },
    2: { result: "❌ Challenging", outcome: "Over-sensitive, emotional confusion, indecisiveness" },
    3: { result: "✅ Good", outcome: "Emotional yet expressive; family-oriented, Moody" },
    4: { result: "Neutral", outcome: "Security-loving but rigid, Emotion meets stability;" },
    5: { result: "Neutral", outcome: "Restless in love, inconsistent relationships" },
    6: { result: "✅ Good", outcome: "Nurturing, romantic, ideal for marriage and love" },
    7: { result: "❌ Challenging", outcome: "Strained bonds, Spiritual-emotional mismatch;" },
    8: { result: "❌ Challenging", outcome: "Emotionally burdened; family/karmic tension" },
    9: { result: "Neutral", outcome: "Generous but emotionally burdened, Mood Swing" }
  },
  3: {
    1: { result: "✅ Good", outcome: "Charismatic speaker; success in media, Leadership" },
    2: { result: "Neutral", outcome: "Emotional creativity, good bonding, Mood swing" },
    3: { result: "❌ Challenging", outcome: "Scattered Energy, over-talkative" },
    4: { result: "Neutral", outcome: "Creative with structure; overly critical tendencies" },
    5: { result: "✅ Good", outcome: "Social, Playful, Networking magnet, Playful, Versatile" },
    6: { result: "✅ Good", outcome: "Artistic, romantic, balanced life" },
    7: { result: "Neutral", outcome: "Spiritual artist, philosophical, needs emotional grounding" },
    8: { result: "❌ Challenging", outcome: "Creative blocks due to karmic delay" },
    9: { result: "✅ Good", outcome: "Expressive, Visionary; creative with spiritual touch" }
  },
  4: {
    1: { result: "Neutral", outcome: "Practical but stiff; power struggle, controlling tendencies" },
    2: { result: "Neutral", outcome: "Rigid emotions, needs flexibility" },
    3: { result: "Neutral", outcome: "Analytical with creative edge; balanced, Cautious success" },
    4: { result: "❌ Challenging", outcome: "Over-disciplined, lacks adaptability and spontaneity" },
    5: { result: "Neutral", outcome: "Smart but lacks consistency, struggles with restlessness" },
    6: { result: "✅ Good", outcome: "Responsible family provider, grounded emotions" },
    7: { result: "❌ Challenging", outcome: "Intellectual blockages; Mental tension, isolation, late success" },
    8: { result: "❌ Challenging", outcome: "Hard work, long struggle, late success" },
    9: { result: "Neutral", outcome: "Structured humanitarian; emotionally detached" }
  },
  5: {
    1: { result: "✅ Good", outcome: "Influential leader with charm and energy" },
    2: { result: "Neutral", outcome: "Expressive but emotionally inconsistent" },
    3: { result: "✅ Good", outcome: "Creative, vibrant, good in sales/media Highly social" },
    4: { result: "Neutral", outcome: "Multi-talented but scattered focus" },
    5: { result: "❌ Challenging", outcome: "Overactive mind; restless, lacks stability & Focus, Distracted" },
    6: { result: "✅ Good", outcome: "Romantic, sensual; lucky in relationships, magnetic personality" },
    7: { result: "Neutral", outcome: "Spiritually curious, Intellectual but emotionally unstable" },
    8: { result: "❌ Challenging", outcome: "Unstable ambition, karmic delays, struggles in middle life" },
    9: { result: "Neutral", outcome: "Talkative, Philanthropic energy, Unstable desires" }
  },
  6: {
    1: { result: "❌ Challenging", outcome: "Loving but dominating; emotional tension in marriage" },
    2: { result: "✅ Good", outcome: "Romantic and nurturing; peaceful domestic life" },
    3: { result: "✅ Good", outcome: "Artistic harmony and expression; well-suited for design/art" },
    4: { result: "Neutral", outcome: "Responsible but emotionally burdened early in life" },
    5: { result: "✅ Good", outcome: "Adventurous in love, good for social life, Attractive personality" },
    6: { result: "❌ Challenging", outcome: "Over-responsibility, suffocation in family, Emotional drain" },
    7: { result: "❌ Challenging", outcome: "Emotional sacrifice, tension in love, Spiritual-emotional burden;" },
    8: { result: "❌ Challenging", outcome: "Family burdened with karma; duties overpower desires" },
    9: { result: "✅ Good", outcome: "Spiritual healer; love through service" }
  },
  7: {
    1: { result: "Neutral", outcome: "Detached thinker with leadership qualities, visionary" },
    2: { result: "❌ Challenging", outcome: "Emotionally disconnected; relationship issues" },
    3: { result: "Neutral", outcome: "Spiritual speaker, deep thinker; can be good in academics/art" },
    4: { result: "❌ Challenging", outcome: "Over-analytical; late success; isolation" },
    5: { result: "Neutral", outcome: "Deep thinker, mentally scattered, seeks freedom; needs balance" },
    6: { result: "❌ Challenging", outcome: "Emotionally burdened, Spiritual detachment from worldly duties" },
    7: { result: "❌ Challenging", outcome: "Too much introspection, lonely path; prone to isolation or anxiety" },
    8: { result: "❌ Challenging", outcome: "Spiritual with karmic blocks; severe delays, Karma-heavy intellect" },
    9: { result: "✅ Good", outcome: "Highly spiritual, Enlightened soul, gives to society & sacrifices for others" }
  },
  8: {
    1: { result: "Neutral", outcome: "High achiever with ego; must act ethically" },
    2: { result: "❌ Challenging", outcome: "Emotional burden, blocked expression; karma in family life" },
    3: { result: "Neutral", outcome: "Powerful speaker with authority, moody, but struggles emotionally" },
    4: { result: "❌ Challenging", outcome: "Rigid thinking, Karmic burden; heavy responsibility and delay" },
    5: { result: "❌ Challenging", outcome: "Powerful but restless achiever; lack of peace" },
    6: { result: "❌ Challenging", outcome: "Family baggage Burdens; dominating in relationships" },
    7: { result: "❌ Challenging", outcome: "Spiritual struggle, Struggles with mental peace; past life karma" },
    8: { result: "❌ Challenging", outcome: "Severe karmic life, extreme delays, setbacks" },
    9: { result: "❌ Challenging", outcome: "Overgiving, burnout, spiritual debt" }
  },
  9: {
    1: { result: "Neutral", outcome: "Visionary but emotional; needs discipline." },
    2: { result: "❌ Challenging", outcome: "Over-giving, drains energy, Too emotional; suffers due to others" },
    3: { result: "✅ Good", outcome: "Creative humanitarian, joyful speaker, Visionary" },
    4: { result: "Neutral", outcome: "Responsible, Humanitarian with structure; late growth" },
    5: { result: "Neutral", outcome: "Spiritual traveller, restless" },
    6: { result: "✅ Good", outcome: "Nurturing and emotional healer, strong family support" },
    7: { result: "✅ Good", outcome: "Mystical, selfless, Spiritual path; renunciation and enlightenment" },
    8: { result: "❌ Challenging", outcome: "Burnout from karmic burden and emotional struggle" },
    9: { result: "❌ Challenging", outcome: "Self-sacrificing, emotionally weak; needs to guard personal health" }
  }
};

export const getDriverConductorAnalysis = (driver: number, conductor: number): DriverConductorAnalysis | null => {
  if (driver >= 1 && driver <= 9 && conductor >= 1 && conductor <= 9) {
    return driverConductorAnalysisData[driver]?.[conductor] || null;
  }
  return null;
};