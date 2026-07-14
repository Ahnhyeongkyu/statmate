-- Run this in your Supabase SQL Editor
CREATE TABLE analysis_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  calculator_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_history_user ON analysis_history(user_id, created_at DESC);

-- Row Level Security
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history"
  ON analysis_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON analysis_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
  ON analysis_history FOR DELETE
  USING (auth.uid() = user_id);

-- ── 이메일 캡처(Q-260714-08 #2) — 익명 방문자 리드. anon INSERT만 허용, 조회는 서비스롤/대시보드 전용 ──
CREATE TABLE email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'paywall_banner',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- 익명(anon) 방문자가 자신의 이메일을 추가만 가능. SELECT/UPDATE/DELETE 정책 없음 = 조회 불가(리드 유출 방지).
CREATE POLICY "Anyone can subscribe"
  ON email_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
