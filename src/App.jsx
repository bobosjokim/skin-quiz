import { useState } from “react”;

const QUESTIONS = [
{
id: 1,
emoji: “🌅”,
question: “세안 후 30분 뒤 피부 상태는?”,
options: [
{ label: “당기고 건조해요”, value: “dry” },
{ label: “촉촉하게 유지돼요”, value: “normal” },
{ label: “T존만 번들거려요”, value: “combo” },
{ label: “전체적으로 번들거려요”, value: “oily” },
],
},
{
id: 2,
emoji: “🔍”,
question: “모공이 눈에 띄는 부위는?”,
options: [
{ label: “거의 없어요”, value: “dry” },
{ label: “약간 있어요 (코 주변)”, value: “normal” },
{ label: “T존(이마·코)에 집중”, value: “combo” },
{ label: “얼굴 전체에 넓어요”, value: “oily” },
],
},
{
id: 3,
emoji: “☀️”,
question: “오후 2시 즈음 피부 상태는?”,
options: [
{ label: “더 건조하고 당겨요”, value: “dry” },
{ label: “아침과 비슷해요”, value: “normal” },
{ label: “T존만 기름져요”, value: “combo” },
{ label: “화장이 다 지워져요”, value: “oily” },
],
},
{
id: 4,
emoji: “🌙”,
question: “가장 신경 쓰이는 피부 고민은?”,
options: [
{ label: “건조함·각질·당김”, value: “dry” },
{ label: “칙칙함·잡티”, value: “normal” },
{ label: “T존 트러블·U존 건조”, value: “combo” },
{ label: “과도한 피지·여드름”, value: “oily” },
],
},
{
id: 5,
emoji: “💧”,
question: “현재 스킨케어 루틴은?”,
options: [
{ label: “보습 위주로 많이 발라요”, value: “dry” },
{ label: “기본 케어만 해요”, value: “normal” },
{ label: “부위별로 다르게 케어해요”, value: “combo” },
{ label: “최대한 가볍게 써요”, value: “oily” },
],
},
];

const RESULTS = {
dry: {
type: “건성 피부”,
emoji: “🌸”,
color: “#f9a8d4”,
bg: “from-pink-50 to-rose-100”,
accent: “#e11d48”,
desc: “수분 공급과 장벽 강화가 핵심이에요. 촉촉하고 건강한 피부를 위해 집중 보습이 필요해요.”,
products: [
{ name: “아티스트리 하이드라 수분크림”, icon: “💆”, reason: “24시간 수분 지속” },
{ name: “뉴트리라이트 콜라겐 플러스”, icon: “✨”, reason: “피부 탄력·수분 보충” },
{ name: “아티스트리 세럼”, icon: “💎”, reason: “피부 장벽 강화” },
],
tip: “세안 후 3분 안에 스킨케어를 완료하세요! 수분이 날아가기 전에 빠르게 잠가주는 게 포인트예요.”,
},
normal: {
type: “중성 피부”,
emoji: “🌿”,
color: “#86efac”,
bg: “from-green-50 to-emerald-100”,
accent: “#059669”,
desc: “균형 잡힌 피부 타입이에요! 현재 상태를 유지하면서 안티에이징에 집중하면 완벽해요.”,
products: [
{ name: “아티스트리 타임 디파이언스”, icon: “⏰”, reason: “노화 예방·탄력 유지” },
{ name: “뉴트리라이트 비타민C”, icon: “🍊”, reason: “피부 톤 개선·항산화” },
{ name: “아티스트리 선크림 SPF50”, icon: “☀️”, reason: “자외선 차단·피부 보호” },
],
tip: “중성 피부의 최대 적은 방심이에요. 자외선 차단과 꾸준한 항산화 케어로 오래 유지하세요!”,
},
combo: {
type: “복합성 피부”,
emoji: “🌺”,
color: “#fde68a”,
bg: “from-yellow-50 to-amber-100”,
accent: “#d97706”,
desc: “T존과 U존이 다른 성질을 가진 복합성! 부위별 맞춤 케어가 핵심이에요.”,
products: [
{ name: “아티스트리 밸런싱 토너”, icon: “⚖️”, reason: “피지·수분 밸런스 조절” },
{ name: “뉴트리라이트 비오틴 플러스”, icon: “🌱”, reason: “피부 균형·모공 관리” },
{ name: “아티스트리 경량 모이스처라이저”, icon: “💨”, reason: “가볍게 촉촉하게” },
],
tip: “T존엔 가벼운 젤 타입, U존엔 크림 타입을 따로 사용하세요. 복합성 피부의 황금 루틴이에요!”,
},
oily: {
type: “지성 피부”,
emoji: “✨”,
color: “#c4b5fd”,
bg: “from-violet-50 to-purple-100”,
accent: “#7c3aed”,
desc: “피지 조절이 핵심이에요. 하지만 과도한 세안은 오히려 피지를 더 늘릴 수 있어요!”,
products: [
{ name: “아티스트리 퓨리파잉 폼 클렌저”, icon: “🫧”, reason: “모공 속 피지 제거” },
{ name: “뉴트리라이트 아연 & 비타민B”, icon: “⚡”, reason: “피지 분비 조절” },
{ name: “아티스트리 매트 컨트롤 세럼”, icon: “🎯”, reason: “번들거림 억제” },
],
tip: “수분이 부족하면 피지가 더 나와요. 오일-프리 수분크림으로 꼭 보습하세요!”,
},
};

function getResult(answers) {
const counts = { dry: 0, normal: 0, combo: 0, oily: 0 };
answers.forEach((a) => { if (a) counts[a]++; });
return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default function SkinQuizApp() {
const [step, setStep] = useState(“start”); // start | quiz | result
const [current, setCurrent] = useState(0);
const [answers, setAnswers] = useState([]);
const [selected, setSelected] = useState(null);
const [resultKey, setResultKey] = useState(null);
const [loading, setLoading] = useState(false);
const [aiAdvice, setAiAdvice] = useState(””);

const question = QUESTIONS[current];
const result = resultKey ? RESULTS[resultKey] : null;

function handleStart() {
setStep(“quiz”);
setCurrent(0);
setAnswers([]);
setSelected(null);
}

function handleSelect(value) {
setSelected(value);
}

async function handleNext() {
const newAnswers = […answers, selected];
if (current < QUESTIONS.length - 1) {
setAnswers(newAnswers);
setCurrent(current + 1);
setSelected(null);
} else {
const key = getResult(newAnswers);
setResultKey(key);
setLoading(true);
setStep(“result”);
setAiAdvice(””);

```
  // AI 에이전트 호출
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `당신은 암웨이 뷰티 전문 상담사입니다. 
```

고객의 피부 타입에 맞춘 친근하고 전문적인 스킨케어 조언을 제공하세요.
반드시 아래 형식으로만 답하세요 (JSON 없이 순수 텍스트):

- 2~3문장의 따뜻한 맞춤 조언
- 이모지를 자연스럽게 포함
- 암웨이 제품과 자연스럽게 연결
- 200자 이내로 간결하게`, messages: [ { role: "user", content: `고객 피부 타입: ${RESULTS[key].type}\n고객 주요 고민: ${newAnswers.map((a, i) => QUESTIONS[i].options.find(o => o.value === a)?.label).join(”, “)}\n\n이 고객을 위한 개인화된 스킨케어 조언을 해주세요.`,
  },
  ],
  }),
  });
  const data = await res.json();
  const text = data.content?.map((c) => c.text || “”).join(””) || “”;
  setAiAdvice(text);
  } catch {
  setAiAdvice(“피부 분석이 완료되었어요! 추천 제품으로 꾸준히 관리해보세요 ✨”);
  } finally {
  setLoading(false);
  }
  }
  }
  
  function handleRestart() {
  setStep(“start”);
  setAnswers([]);
  setSelected(null);
  setResultKey(null);
  setAiAdvice(””);
  setCurrent(0);
  }
  
  return (
  
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ede9fe 100%)",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
      }}>
  
  ```
    {/* START SCREEN */}
    {step === "start" && (
      <div style={{ textAlign: "center" }}>
        <div style={{
          background: "white",
          borderRadius: "32px",
          padding: "48px 36px",
          boxShadow: "0 20px 60px rgba(219,39,119,0.15)",
        }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌸</div>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "#1a1a2e",
            marginBottom: "8px",
            lineHeight: 1.3,
          }}>
            나의 피부 타입은<br />무엇일까요?
          </h1>
          <p style={{
            color: "#6b7280",
            fontSize: "14px",
            marginBottom: "12px",
            lineHeight: 1.7,
          }}>
            5가지 질문으로 피부 타입을 진단하고<br />
            맞춤 암웨이 제품을 추천받으세요
          </p>
          <div style={{
            background: "linear-gradient(135deg, #fce7f3, #ede9fe)",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "28px",
            fontSize: "13px",
            color: "#6b21a8",
            fontWeight: "600",
          }}>
            ✨ AI가 실시간으로 개인 맞춤 조언을 드려요
          </div>
          <button
            onClick={handleStart}
            style={{
              width: "100%",
              padding: "18px",
              background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              color: "white",
              border: "none",
              borderRadius: "20px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(236,72,153,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            진단 시작하기 →
          </button>
          <p style={{ color: "#9ca3af", fontSize: "12px", marginTop: "16px" }}>
            소요시간 약 1분 · 완전 무료
          </p>
        </div>
      </div>
    )}
  
    {/* QUIZ SCREEN */}
    {step === "quiz" && (
      <div>
        {/* Progress */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "13px",
            color: "#6b7280",
            fontWeight: "600",
          }}>
            <span>질문 {current + 1} / {QUESTIONS.length}</span>
            <span>{Math.round(((current + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div style={{
            height: "8px",
            background: "rgba(255,255,255,0.6)",
            borderRadius: "100px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${((current + 1) / QUESTIONS.length) * 100}%`,
              background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
              borderRadius: "100px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
  
        {/* Question Card */}
        <div style={{
          background: "white",
          borderRadius: "28px",
          padding: "36px 28px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
        }}>
          <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "16px" }}>
            {question.emoji}
          </div>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a2e",
            textAlign: "center",
            marginBottom: "28px",
            lineHeight: 1.4,
          }}>
            {question.question}
          </h2>
  
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: "16px 20px",
                  borderRadius: "16px",
                  border: selected === opt.value
                    ? "2px solid #ec4899"
                    : "2px solid #f3f4f6",
                  background: selected === opt.value
                    ? "linear-gradient(135deg, #fce7f3, #ede9fe)"
                    : "#f9fafb",
                  color: selected === opt.value ? "#be185d" : "#374151",
                  fontSize: "15px",
                  fontWeight: selected === opt.value ? "700" : "500",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  transform: selected === opt.value ? "scale(1.02)" : "scale(1)",
                }}
              >
                {selected === opt.value ? "✓ " : ""}{opt.label}
              </button>
            ))}
          </div>
  
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              width: "100%",
              marginTop: "24px",
              padding: "16px",
              background: selected
                ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                : "#e5e7eb",
              color: selected ? "white" : "#9ca3af",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: selected ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            {current === QUESTIONS.length - 1 ? "결과 보기 ✨" : "다음 질문 →"}
          </button>
        </div>
      </div>
    )}
  
    {/* RESULT SCREEN */}
    {step === "result" && result && (
      <div>
        <div style={{
          background: "white",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${result.color}80, ${result.color}40)`,
            padding: "40px 28px 32px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "60px", marginBottom: "12px" }}>{result.emoji}</div>
            <div style={{
              display: "inline-block",
              background: result.accent,
              color: "white",
              borderRadius: "100px",
              padding: "6px 20px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "12px",
            }}>
              진단 결과
            </div>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#1a1a2e",
              marginBottom: "12px",
            }}>
              {result.type}
            </h2>
            <p style={{
              color: "#4b5563",
              fontSize: "14px",
              lineHeight: 1.7,
            }}>
              {result.desc}
            </p>
          </div>
  
          <div style={{ padding: "28px" }}>
            {/* AI Advice */}
            <div style={{
              background: "linear-gradient(135deg, #fdf4ff, #fce7f3)",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "24px",
              border: "1px solid #f9a8d4",
            }}>
              <div style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#be185d",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                🤖 AI 맞춤 조언
              </div>
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af" }}>
                  <div style={{
                    width: "16px", height: "16px",
                    border: "2px solid #f9a8d4",
                    borderTopColor: "#ec4899",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <span style={{ fontSize: "14px" }}>AI가 분석 중이에요...</span>
                </div>
              ) : (
                <p style={{
                  color: "#374151",
                  fontSize: "14px",
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {aiAdvice}
                </p>
              )}
            </div>
  
            {/* Products */}
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1a1a2e",
              marginBottom: "14px",
            }}>
              🛍️ 맞춤 추천 제품
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {result.products.map((p, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  background: "#f9fafb",
                  borderRadius: "16px",
                  border: "1px solid #f3f4f6",
                }}>
                  <span style={{ fontSize: "28px" }}>{p.icon}</span>
                  <div>
                    <div style={{ fontWeight: "700", color: "#1a1a2e", fontSize: "14px" }}>
                      {p.name}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "2px" }}>
                      {p.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Tip */}
            <div style={{
              background: `${result.color}30`,
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "24px",
              borderLeft: `4px solid ${result.accent}`,
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: result.accent, marginBottom: "6px" }}>
                💡 전문가 TIP
              </div>
              <p style={{ color: "#374151", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                {result.tip}
              </p>
            </div>
  
            {/* CTA */}
            <button
              onClick={() => alert("상담 연결 기능을 추가해보세요! 카카오톡 링크나 전화번호를 연결하세요.")}
              style={{
                width: "100%",
                padding: "18px",
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                color: "white",
                border: "none",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                marginBottom: "12px",
                boxShadow: "0 8px 24px rgba(236,72,153,0.35)",
              }}
            >
              💬 전문가 1:1 무료 상담받기
            </button>
            <button
              onClick={handleRestart}
              style={{
                width: "100%",
                padding: "14px",
                background: "transparent",
                color: "#9ca3af",
                border: "2px solid #e5e7eb",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              다시 진단하기
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  <style>{`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}</style>
  ```
  
    </div>
  );

}
