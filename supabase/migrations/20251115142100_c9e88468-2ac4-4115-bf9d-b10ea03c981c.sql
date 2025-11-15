-- Insert fake club profiles for testing
-- These will be test accounts that can be used to see clubs in the discover page

-- Generate 15 fake auth users for clubs
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  aud,
  role
) VALUES
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'fctoulouse@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'aslyonnord@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'bordeauxsc@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'parisfcjeunes@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', 'marseilleacademy@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000000', 'lyonbasketelite@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', 'toulousebc@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000000', 'parisbasketacademy@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('99999999-9999-9999-9999-999999999999', '00000000-0000-0000-0000-000000000000', 'toulouserugby@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'bordeauxrugby@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'nicetennisacademy@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000000', 'lyontenniscenter@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000000', 'marseillevolley@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000000', 'toulousehandball@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '00000000-0000-0000-0000-000000000000', 'parisfightclub@club.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"user_type": "club"}'::jsonb, 'authenticated', 'authenticated');

-- Insert profiles (triggered automatically by handle_new_user function, but we'll add manually to be safe)
INSERT INTO profiles (id, email, user_type) VALUES
('11111111-1111-1111-1111-111111111111', 'fctoulouse@club.com', 'club'),
('22222222-2222-2222-2222-222222222222', 'aslyonnord@club.com', 'club'),
('33333333-3333-3333-3333-333333333333', 'bordeauxsc@club.com', 'club'),
('44444444-4444-4444-4444-444444444444', 'parisfcjeunes@club.com', 'club'),
('55555555-5555-5555-5555-555555555555', 'marseilleacademy@club.com', 'club'),
('66666666-6666-6666-6666-666666666666', 'lyonbasketelite@club.com', 'club'),
('77777777-7777-7777-7777-777777777777', 'toulousebc@club.com', 'club'),
('88888888-8888-8888-8888-888888888888', 'parisbasketacademy@club.com', 'club'),
('99999999-9999-9999-9999-999999999999', 'toulouserugby@club.com', 'club'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bordeauxrugby@club.com', 'club'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'nicetennisacademy@club.com', 'club'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'lyontenniscenter@club.com', 'club'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'marseillevolley@club.com', 'club'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'toulousehandball@club.com', 'club'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'parisfightclub@club.com', 'club')
ON CONFLICT (id) DO NOTHING;

-- Insert club profiles with complete data
INSERT INTO club_profiles (
  id, club_name, city, country, sport_id, division, division_level,
  recruitment_needs, budget, playing_style, team_culture, facilities,
  description, active_recruitment, logo_url
) VALUES
-- Football Clubs (5)
('11111111-1111-1111-1111-111111111111', 'FC Toulouse', 'Toulouse', 'France', '34fb9dda-2e75-4c42-961c-681be9b496e1', 'Division 2', 2,
 '{"positions": ["Attaquant", "Milieu"], "age_range": "18-25", "experience": "Semi-pro"}'::jsonb,
 '{"min_salary": 1200, "max_salary": 2500, "currency": "EUR"}'::jsonb,
 ARRAY['Tactique', 'Technique', 'Possession'],
 ARRAY['Professionnel', 'Ambitieux', 'Formateur'],
 ARRAY['Stade moderne', 'Centre d''entraînement', 'Salle de musculation'],
 'Club historique de Toulouse avec une forte tradition de formation. Nous recherchons des jeunes talents motivés pour rejoindre notre projet ambitieux.', true, '⚽'),

('22222222-2222-2222-2222-222222222222', 'AS Lyon Nord', 'Lyon', 'France', '34fb9dda-2e75-4c42-961c-681be9b496e1', 'Division 3', 3,
 '{"positions": ["Défenseur", "Milieu défensif"], "age_range": "19-28", "experience": "Amateur+"}'::jsonb,
 '{"min_salary": 800, "max_salary": 1500, "currency": "EUR"}'::jsonb,
 ARRAY['Physique', 'Contre-attaque', 'Solidité défensive'],
 ARRAY['Familial', 'Solidaire', 'Convivial'],
 ARRAY['Terrain synthétique', 'Vestiaires modernes', 'Club house'],
 'Club familial du nord de Lyon cherchant à renforcer sa défense. Ambiance conviviale et esprit d''équipe garantis.', true, '🏆'),

('33333333-3333-3333-3333-333333333333', 'Bordeaux Sport Club', 'Bordeaux', 'France', '34fb9dda-2e75-4c42-961c-681be9b496e1', 'Division 1', 1,
 '{"positions": ["Gardien", "Attaquant"], "age_range": "20-30", "experience": "Pro"}'::jsonb,
 '{"min_salary": 2500, "max_salary": 5000, "currency": "EUR"}'::jsonb,
 ARRAY['Offensif', 'Spectaculaire', 'Pressing haut'],
 ARRAY['Professionnel', 'Exigeant', 'Ambitieux'],
 ARRAY['Stade 15000 places', 'Centre médical', 'Analyse vidéo'],
 'Club professionnel bordelais visant la montée en élite. Infrastructures de premier ordre et staff technique expérimenté.', true, '🔴'),

('44444444-4444-4444-4444-444444444444', 'Paris FC Jeunes', 'Paris', 'France', '34fb9dda-2e75-4c42-961c-681be9b496e1', 'Division 2', 2,
 '{"positions": ["Milieu offensif", "Ailier"], "age_range": "16-23", "experience": "Espoirs"}'::jsonb,
 '{"min_salary": 1000, "max_salary": 2000, "currency": "EUR"}'::jsonb,
 ARRAY['Technique', 'Créatif', 'Jeu rapide'],
 ARRAY['Formateur', 'Bienveillant', 'Éducatif'],
 ARRAY['Complexe sportif Paris', 'Hébergement', 'Scolarité intégrée'],
 'Centre de formation parisien reconnu. Nous accompagnons les jeunes talents vers le professionnalisme avec un suivi personnalisé.', true, '⭐'),

('55555555-5555-5555-5555-555555555555', 'Marseille Academy', 'Marseille', 'France', '34fb9dda-2e75-4c42-961c-681be9b496e1', 'Division 3', 3,
 '{"positions": ["Tous postes"], "age_range": "18-26", "experience": "Tous niveaux"}'::jsonb,
 '{"min_salary": 600, "max_salary": 1200, "currency": "EUR"}'::jsonb,
 ARRAY['Polyvalent', 'Adaptable', 'Collectif'],
 ARRAY['Méditerranéen', 'Passionné', 'Chaleureux'],
 ARRAY['Terrain municipal', 'Accès mer', 'Ambiance sud'],
 'Académie marseillaise ouverte à tous les profils. Passion du foot sous le soleil du sud avec une vraie culture méditerranéenne.', true, '🔵'),

-- Basketball Clubs (3)
('66666666-6666-6666-6666-666666666666', 'Lyon Basket Elite', 'Lyon', 'France', '4a1813e7-2d99-45d8-b6b6-177daf2696bb', 'Pro B', 2,
 '{"positions": ["Meneur", "Pivot"], "age_range": "20-28", "experience": "Pro"}'::jsonb,
 '{"min_salary": 2000, "max_salary": 4000, "currency": "EUR"}'::jsonb,
 ARRAY['Rapide', 'Athlétique', 'Pick and roll'],
 ARRAY['Professionnel', 'Compétitif', 'Excellence'],
 ARRAY['Salle 3000 places', 'Préparation physique', 'Kiné'],
 'Club professionnel de Pro B cherchant à rejoindre l''élite. Jeu spectaculaire et équipe compétitive.', true, '🏀'),

('77777777-7777-7777-7777-777777777777', 'Toulouse BC', 'Toulouse', 'France', '4a1813e7-2d99-45d8-b6b6-177daf2696bb', 'Nationale 1', 3,
 '{"positions": ["Arrière", "Ailier"], "age_range": "19-25", "experience": "Semi-pro"}'::jsonb,
 '{"min_salary": 1200, "max_salary": 2200, "currency": "EUR"}'::jsonb,
 ARRAY['Défense de zone', 'Transition rapide', 'Tir extérieur'],
 ARRAY['Ambitieux', 'Travailleur', 'Solidaire'],
 ARRAY['Gymnase moderne', 'Salle musculation', 'Vestiaires'],
 'Club de N1 avec de belles ambitions. Nous misons sur un collectif solide et un jeu rythmé.', true, '🔶'),

('88888888-8888-8888-8888-888888888888', 'Paris Basketball Academy', 'Paris', 'France', '4a1813e7-2d99-45d8-b6b6-177daf2696bb', 'Espoirs', 4,
 '{"positions": ["Tous postes"], "age_range": "16-21", "experience": "Espoirs"}'::jsonb,
 '{"min_salary": 400, "max_salary": 1000, "currency": "EUR"}'::jsonb,
 ARRAY['Formation', 'Fondamentaux', 'Développement'],
 ARRAY['Formateur', 'Pédagogique', 'Encadrant'],
 ARRAY['Académie basketball', 'Internat', 'Études'],
 'Académie parisienne de formation dédiée aux jeunes espoirs. Développement technique et accompagnement scolaire.', true, '🎓'),

-- Rugby Clubs (2)
('99999999-9999-9999-9999-999999999999', 'Toulouse Rugby Club', 'Toulouse', 'France', 'e9dc6399-0526-406a-90bc-cb81075d2111', 'Fédérale 1', 3,
 '{"positions": ["Pilier", "Centre"], "age_range": "20-30", "experience": "Senior"}'::jsonb,
 '{"min_salary": 1500, "max_salary": 2800, "currency": "EUR"}'::jsonb,
 ARRAY['Physique', 'Mêlée puissante', 'Jeu au pied'],
 ARRAY['Valeurs rugby', 'Respect', 'Solidarité'],
 ARRAY['Stade rugby', 'Musculation', 'Kinésithérapie'],
 'Club de rugby toulousain en Fédérale 1. Valeurs fortes du rugby et esprit d''équipe incomparable.', true, '🏉'),

('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bordeaux Rugby XV', 'Bordeaux', 'France', 'e9dc6399-0526-406a-90bc-cb81075d2111', 'Fédérale 2', 4,
 '{"positions": ["Talonneur", "Demi de mêlée"], "age_range": "18-28", "experience": "Amateur+"}'::jsonb,
 '{"min_salary": 800, "max_salary": 1600, "currency": "EUR"}'::jsonb,
 ARRAY['Collectif', 'Engagement', 'Combat'],
 ARRAY['Convivial', 'Passionné', 'Troisième mi-temps'],
 ARRAY['Terrain rugby', 'Club house', 'Douches'],
 'Rugby bordelais authentique en Fédérale 2. Ambiance chaleureuse et vraies valeurs du rugby amateur.', true, '🍇'),

-- Tennis Clubs (2)
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Nice Tennis Academy', 'Nice', 'France', 'ebd37efa-0f9a-4c40-ad2d-862e137ea7ab', 'National', 2,
 '{"positions": ["Simple", "Double"], "age_range": "16-25", "experience": "Classé"}'::jsonb,
 '{"min_salary": 1000, "max_salary": 2500, "currency": "EUR"}'::jsonb,
 ARRAY['Fond de court', 'Service-volée', 'Mental'],
 ARRAY['Excellence', 'Discipline', 'Performance'],
 ARRAY['Courts en terre battue', 'Prépa physique', 'Coach mental'],
 'Académie de tennis sur la Côte d''Azur. Conditions d''entraînement idéales et coaching de haut niveau.', true, '🎾'),

('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Lyon Tennis Center', 'Lyon', 'France', 'ebd37efa-0f9a-4c40-ad2d-862e137ea7ab', 'Regional', 3,
 '{"positions": ["Simple"], "age_range": "18-28", "experience": "Tous niveaux"}'::jsonb,
 '{"min_salary": 600, "max_salary": 1500, "currency": "EUR"}'::jsonb,
 ARRAY['Régularité', 'Tactique', 'Endurance'],
 ARRAY['Progressif', 'Pédagogique', 'Accessible'],
 ARRAY['Courts couverts', 'Mur d''entraînement', 'Vestiaires'],
 'Centre de tennis lyonnais pour tous niveaux. Développement progressif et ambiance conviviale.', true, '🏸'),

-- Other Sports (3)
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Marseille Volley', 'Marseille', 'France', '7cbe0153-977e-4f72-82e5-4d3b50c12119', 'N2', 3,
 '{"positions": ["Passeur", "Attaquant"], "age_range": "18-26", "experience": "N2/N3"}'::jsonb,
 '{"min_salary": 800, "max_salary": 1800, "currency": "EUR"}'::jsonb,
 ARRAY['Attaque rapide', 'Contre puissant', 'Service flottant'],
 ARRAY['Dynamique', 'Collectif', 'Énergique'],
 ARRAY['Gymnase N2', 'Kiné', 'Vidéo'],
 'Club de volley marseillais en N2. Équipe dynamique et jeu spectaculaire dans une ambiance méditerranéenne.', true, '🏐'),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Toulouse Handball', 'Toulouse', 'France', 'a59222b5-f290-4fd0-8c0a-4e94195c8e5b', 'N3', 4,
 '{"positions": ["Arrière", "Pivot"], "age_range": "19-27", "experience": "Régional"}'::jsonb,
 '{"min_salary": 500, "max_salary": 1200, "currency": "EUR"}'::jsonb,
 ARRAY['Jeu rapide', 'Défense 6-0', 'Contre-attaque'],
 ARRAY['Convivial', 'Sportif', 'Fair-play'],
 ARRAY['Salle handball', 'Vestiaires', 'Matériel'],
 'Club de handball toulousain en N3. Ambiance familiale et envie de progresser ensemble.', true, '🤾'),

('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Paris Fight Club', 'Paris', 'France', '0ca24576-5abc-40c0-8ba4-4e517821f3a8', 'Amateur', 5,
 '{"positions": ["MMA", "Grappling"], "age_range": "18-30", "experience": "Tous niveaux"}'::jsonb,
 '{"min_salary": 300, "max_salary": 1000, "currency": "EUR"}'::jsonb,
 ARRAY['Striking', 'Grappling', 'Cardio'],
 ARRAY['Respect', 'Discipline', 'Dépassement'],
 ARRAY['Cage MMA', 'Tatami', 'Salle fitness'],
 'Club de MMA parisien pour amateurs. Formation complète en arts martiaux mixtes avec coaches expérimentés.', true, '🥊');