import { supabase } from './supabase'
import { afterMission, today } from './game'

export type MissionId = 'write' | 'connect' | 'explain' | 'defend' | 'hypothesis'

export type Mission = {
  id: MissionId // logs.category 에 저장되는 값
  name: string
  card: string // 카드 그림 (그림 4개가 2x2로 붙어있는 한장)
  spot: [number, number] // 그 중 몇번째 칸인지 [가로, 세로]
}

// 오늘 나의 학습 5개 (카드 순서)
export const MISSIONS: Mission[] = [
  { id: 'write', name: '글쓰기', card: '/images/learn-cards-2.png', spot: [1, 0] },
  { id: 'connect', name: '개념 연결', card: '/images/learn-cards-1.png', spot: [0, 0] },
  { id: 'explain', name: '설명하기', card: '/images/learn-cards-2.png', spot: [0, 0] },
  { id: 'defend', name: '반대편 변호하기', card: '/images/learn-cards-2.png', spot: [0, 1] },
  { id: 'hypothesis', name: '가설 세우기', card: '/images/learn-cards-2.png', spot: [1, 1] },
]

// 오늘의 문제. 지금은 고정이라 나중에 db에서 불러오면 여기만 바꾸면 됨
export const TODAY = {
  explain: {
    word: '비교우위란?',
    text: '(비교우위는 국제 무역이론에서 가장 핵심적인 개념 중 하나로, 각 국가나 경제 주체가 가장 적은 기회비용으로 생산할 수 있는 재화나 서비스에 집중함으로써 전체적인 경제적 효율성과 부의 극대화를 이끌어낼 수 있다는 원리를 의미합니다.)',
  },
  write: { topic: '10년 뒤의 나에게 쓰는 편지' },
  connect: { words: ['고양이', '사과'] },
  defend: { claim: '숙제는 모두 없애야 한다' },
  hypothesis: {
    text: '요즘 2030 세대에서 과거 7080년도의 유행을 추구하는\n<레트로 열풍>이 일어나고 있습니다.\n옛날 카메라를 구입한다거나, 통이 크고 긴 바지를 입거나,\n언발란스한 색으로 코디를 하는 등의 유행인 것입니다.',
    question: '이 현상에 대한 원인은 무엇일까요?',
  },
}

// 학습 끝나면 기록 저장 + 경험치, 하트, 연속기록 올림. 로그인 안했으면(데모) 저장 안함
export async function finishMission(id: MissionId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const t = today()
    const { data: done } = await supabase.from('logs').select('category').eq('done_date', t).eq('category', id)
    if (done?.length) return // 오늘 이미 한 학습은 한번만

    const { error } = await supabase.from('logs').insert({ user_id: user.id, category: id, done_date: t })
    if (error) throw error

    const { data: p } = await supabase.from('profiles').select('xp, hp, streak, last_done').eq('id', user.id).single()
    if (p) await supabase.from('profiles').update(afterMission(p)).eq('id', user.id)
  } catch (e) {
    console.warn('학습 기록 저장 실패', e)
  }
}
