/*
 * Site content. Edit this file to update the portfolio — no build step needed.
 * Every number here is taken from the published papers / public registries.
 * Bilingual fields use { en, ko }.
 */
window.SITE = {
  person: {
    email: 'evening0619@gmail.com',
    links: {
      scholar: 'https://scholar.google.com/citations?user=uQGNBV0AAAAJ',
      github: 'https://github.com/jhlee0619',
      huggingface: 'https://huggingface.co/jhlee0619',
      lab: 'https://sites.google.com/view/snuhradaicon/home',
      bric: 'https://www.ibric.org/bric/hanbitsa/han-interview.do?mode=view&id=99364&authorId=50580#!/list'
    }
  },

  capabilities: [
    {
      id: 'integrate', n: '01', name: 'Integrate',
      title: { en: 'Combining different kinds of evidence', ko: '서로 다른 근거 결합하기' },
      body: {
        en: 'Combining imaging, clinical, molecular, and treatment data for prognosis — including cases where some inputs are missing.',
        ko: '영상·임상·분자·치료 정보를 결합해 예후를 예측합니다. 일부 입력이 빠진 경우도 함께 고려합니다.'
      },
      works: ['GlioSurv', 'Time-dependent survival interpretability', 'Retrieval-augmented MRI reporting']
    },
    {
      id: 'recover', n: '02', name: 'Recover',
      title: { en: 'Filling in missing images', ko: '빠진 영상 보완하기' },
      body: {
        en: 'Synthesizing and super-resolving images that are hard to acquire in time, while trying to keep small lesions intact.',
        ko: '제때 얻기 어려운 영상을 합성하거나 고해상도로 복원합니다. 작은 병변을 잃지 않는 데 신경 씁니다.'
      },
      works: ['Lesion-aware latent diffusion', 'DCE-MRI super-resolution & denoising']
    },
    {
      id: 'constrain', n: '03', name: 'Constrain',
      title: { en: 'Using physics as a constraint', ko: '물리 법칙을 제약으로 쓰기' },
      body: {
        en: 'Adding perfusion physics to the model and estimating how uncertain the result is when measurements are sparse and noisy.',
        ko: '관류 물리식을 모델에 넣고, 측정이 성기고 잡음이 많을 때 결과가 얼마나 불확실한지 추정합니다.'
      },
      works: ['EPPINN', 'ST-SRPerf (neural ODE + INR)']
    },
    {
      id: 'contextualize', n: '04', name: 'Contextualize',
      title: { en: 'Checking how models use context', ko: '모델의 문맥 사용 점검하기' },
      body: {
        en: 'Building benchmarks that test whether models use relevant history and resist misleading context or prompt injection.',
        ko: '모델이 관련 있는 병력은 활용하고, 오도하는 문맥이나 프롬프트 인젝션에는 흔들리지 않는지 벤치마크로 확인합니다.'
      },
      works: ['MC-CXR', 'MPIB', 'MedLayBench-V']
    }
  ],

  // `authors`: a trailing * marks equal contribution (co-first authors).
  publications: [
    {
      year: 2026, venue: 'Findings of EMNLP', type: 'conference', axis: 'contextualize',
      title: 'MC-CXR: A Multi-Context Chest X-ray Benchmark for Context-Induced Disruption in Vision-Language Models',
      authors: ['Junhyeok Lee', 'Songsoo Kim', 'Kyu Sung Choi'],
      links: { paper: 'https://arxiv.org/abs/2608.24118' }
    },
    {
      year: 2026, venue: 'Findings of EMNLP', type: 'conference', axis: 'contextualize',
      title: 'MPIB: A Benchmark for Medical Prompt Injection Attacks and Clinical Safety in LLMs',
      authors: ['Junhyeok Lee', 'Han Jang', 'Kyu Sung Choi'],
      links: { paper: 'https://arxiv.org/abs/2602.06268', code: 'https://github.com/jhlee0619/mpib-eval', data: 'https://huggingface.co/datasets/jhlee0619/mpib' }
    },
    {
      year: 2026, venue: 'Radiology: Artificial Intelligence', type: 'journal', axis: 'integrate', note: { en: '* equal contribution', ko: '* 공동 제1저자' },
      title: 'Deep Learning for Survival Prediction in Glioblastoma: Time-dependent Model Interpretability Using MRI, Clinical, and Molecular Data',
      authors: ['Junhyeok Lee*', 'Young Hun Jeon*', 'Joon Jang', 'Heeseong Eum', 'Minchul Kim', 'Sung Hye Park', 'Chul-Kee Park', 'Seung Hong Choi', 'Sung Soo Ahn', 'Kyu Sung Choi'],
      links: { paper: 'https://doi.org/10.1148/ryai.250675', code: 'https://github.com/snuh-rad-aicon/gbm-survival-dpi' }
    },
    {
      year: 2026, venue: 'Findings of ACL', type: 'conference', axis: 'contextualize', note: { en: '* equal contribution', ko: '* 공동 제1저자' },
      title: 'MedLayBench-V: A Large-Scale Benchmark for Expert-Lay Semantic Alignment in Medical Vision Language Models',
      authors: ['Han Jang*', 'Junhyeok Lee*', 'Heeseong Eum', 'Kyu Sung Choi'],
      links: { paper: 'https://arxiv.org/abs/2604.05738' }
    },
    {
      year: 2026, venue: 'MICCAI', type: 'conference', axis: 'integrate', note: { en: '* equal contribution', ko: '* 공동 제1저자' },
      title: 'Improving Factuality of 3D Brain MRI Report Generation with Paired Image-domain Retrieval and Text-domain Augmentation',
      authors: ['Junhyeok Lee*', 'Yujin Oh*', 'Dahyoun Lee', 'Hyon Keun Joh', 'Minchul Kim', 'Chul-Ho Sohn', 'Sung Hyun Baik', 'Cheolkyu Jung', 'Jung Hyun Park', 'Kyu Sung Choi', 'Byung-Hoon Kim', 'Jong Chul Ye'],
      links: { paper: 'https://arxiv.org/abs/2411.15490', code: 'https://github.com/jhlee0619/PIRTA' }
    },
    {
      year: 2026, venue: 'MICCAI', type: 'conference', axis: 'constrain',
      title: 'Evidential Perfusion Physics-Informed Neural Networks with Residual Uncertainty Quantification',
      authors: ['Junhyeok Lee', 'Minseo Choi', 'Han Jang', 'Young Hun Jeon', 'Heeseong Eum', 'Joon Jang', 'Chul-Ho Sohn', 'Kyu Sung Choi'],
      links: { paper: 'https://arxiv.org/abs/2603.09359', code: 'https://github.com/jhlee0619/EPPINN' }
    },
    {
      year: 2025, venue: 'PLOS ONE', type: 'journal', axis: 'translate',
      title: 'Deep learning for deep learning performance: How much data is needed for segmentation in biomedical imaging?',
      authors: ['Junhyeok Lee', 'Hyungjin Chung', 'Minseok Suh', 'Jeong-Hoon Lee', 'Kyu Sung Choi'],
      links: { paper: 'https://doi.org/10.1371/journal.pone.0339064' }
    },
    {
      year: 2025, venue: 'MICCAI Workshop (CLIP)', type: 'conference', axis: 'translate',
      title: 'Domain-Specialized Interactive Segmentation Framework for Meningioma Radiotherapy Planning',
      authors: ['Junhyeok Lee', 'Han Jang', 'Kyu Sung Choi'],
      links: { paper: 'https://arxiv.org/abs/2510.00416', code: 'https://github.com/snuh-rad-aicon/Interactive-MEN-RT' }
    },
    {
      year: 2025, venue: 'MICCAI', type: 'conference', axis: 'recover', note: { en: '* equal contribution', ko: '* 공동 제1저자' },
      title: 'Lesion-Aware Post-Training of Latent Diffusion Models for Synthesizing Diffusion MRI from CT Perfusion',
      authors: ['Junhyeok Lee*', 'Hyunwoong Kim*', 'Hyungjin Chung', 'Heeseong Eom', 'Joon Jang', 'Chul-Ho Sohn', 'Kyu Sung Choi'],
      links: { paper: 'https://papers.miccai.org/miccai-2025/0491-Paper2317.html', code: 'https://github.com/snuh-rad-aicon/Diffusion-LAPT' }
    },
    {
      year: 2025, venue: 'Computers in Biology and Medicine', type: 'journal', axis: 'constrain',
      title: 'ST-SRPerf: Continuous spatiotemporal representation for perfusion MRI super-resolution through neural ODE and implicit neural representation',
      authors: ['Junhyeok Lee', 'Yoseob Han', 'Joon Jang', 'Hyochul Lee', 'Jung Hyun Park', 'Inpyeong Hwang', 'Jin Wook Chung', 'Seung Hong Choi', 'Kyu Sung Choi'],
      links: { paper: 'https://www.sciencedirect.com/science/article/abs/pii/S0010482525013885' }
    },
    {
      year: 2025, venue: 'npj Digital Medicine', type: 'journal', axis: 'integrate',
      title: 'GlioSurv: interpretable transformer for multimodal, individualized survival prediction in diffuse glioma',
      authors: ['Junhyeok Lee', 'Joon Jang', 'Heeseong Eum', 'Han Jang', 'Minchul Kim', 'Sung Hye Park', 'Chul Kee Park', 'Seung Hong Choi', 'Sung Soo Ahn', 'Yoseob Han', 'Kyu Sung Choi'],
      links: { paper: 'https://www.nature.com/articles/s41746-025-02018-x', code: 'https://github.com/snuh-rad-aicon/GlioSurv' }
    },
    {
      year: 2024, venue: 'Scientific Reports', type: 'journal', axis: 'recover',
      title: 'Deep learning-based super-resolution and denoising algorithm improves reliability of dynamic contrast-enhanced MRI in diffuse glioma',
      authors: ['Junhyeok Lee', 'Woojin Jung', 'Seungwook Yang', 'Jung Hyun Park', 'Inpyeong Hwang', 'Jin Wook Chung', 'Seung Hong Choi', 'Kyu Sung Choi'],
      links: { paper: 'https://www.nature.com/articles/s41598-024-76592-7' }
    }
  ],

  // `repo` enables live GitHub stars; `npm` enables live download counts.
  repos: [
    {
      name: 'citecheck', kind: 'tool', lang: 'TypeScript', repo: 'jhlee0619/citecheck', npm: '@jhlee0619/citecheck',
      desc: {
        en: 'MCP server that checks references against PubMed, Crossref, arXiv and Semantic Scholar and returns a corrected bibliography.',
        ko: '참고문헌을 PubMed·Crossref·arXiv·Semantic Scholar와 대조해 교정본을 돌려주는 MCP 서버.'
      },
      cmd: 'claude mcp add citecheck -- npx -y @jhlee0619/citecheck'
    },
    {
      name: 'CodexLoop', kind: 'tool', lang: 'TypeScript', npm: '@jhlee0619/codexloop',
      url: 'https://www.npmjs.com/package/@jhlee0619/codexloop',
      desc: {
        en: 'Evaluate → propose → rank → apply → verify → log. An improvement loop that keeps a change only if the tests confirm it.',
        ko: '평가 → 제안 → 순위 → 적용 → 검증 → 기록. 테스트로 확인된 변경만 남기는 개선 루프.'
      }
    },
    {
      name: 'research-dojo', kind: 'tool', lang: 'Python', repo: 'jhlee0619/research-dojo',
      desc: {
        en: 'Local research workflow with Claude Code and Codex subagents — fixed evaluators, hashed code, multi-seed comparison.',
        ko: 'Claude Code·Codex 서브에이전트를 쓰는 로컬 연구 워크플로. 고정 평가기·코드 해시·다중 시드 비교.'
      }
    },
    {
      name: 'local-citation-verifier', kind: 'tool', lang: 'JavaScript', repo: 'jhlee0619/local-citation-verifier',
      demo: 'https://jhlee0619.github.io/local-citation-verifier/',
      desc: {
        en: 'Browser-based BibTeX citation checker with on-device WebGPU reranking (extends an existing open-source tool).',
        ko: '브라우저에서 WebGPU로 후보를 재순위화하는 BibTeX 인용 검증기 (기존 오픈소스 확장).'
      }
    },
    {
      name: 'adversarial-paper-writing', kind: 'tool', lang: 'Python', repo: 'jhlee0619/adversarial-paper-writing',
      desc: {
        en: 'A Codex skill for evidence-locked review, revision and verification of paper drafts.',
        ko: '근거에 고정된 리뷰·수정·검증으로 논문 초안을 다듬는 Codex 스킬.'
      }
    },
    {
      name: 'MPIB', kind: 'data', lang: 'Python', repo: 'jhlee0619/mpib-eval',
      data: 'https://huggingface.co/datasets/jhlee0619/mpib',
      desc: {
        en: 'Medical prompt-injection benchmark (9,697 instances, Hugging Face) and its evaluation toolkit.',
        ko: '의료 프롬프트 인젝션 벤치마크(9,697건, Hugging Face)와 평가 도구.'
      }
    },
    {
      name: 'EPPINN', kind: 'research', lang: 'Python', repo: 'jhlee0619/EPPINN',
      desc: {
        en: 'Evidential perfusion PINN with residual uncertainty (MICCAI 2026).',
        ko: '물리 잔차 불확실성을 추정하는 관류 PINN (MICCAI 2026).'
      }
    },
    {
      name: 'PIRTA', kind: 'research', lang: 'Python', repo: 'jhlee0619/PIRTA',
      desc: {
        en: 'Retrieval-augmented 3D brain MRI report generation (MICCAI 2026).',
        ko: '검색 증강 기반 3D 뇌 MRI 판독문 생성 (MICCAI 2026).'
      }
    },
    {
      name: 'LDM3D-LAPT', kind: 'research', lang: 'Python', repo: 'jhlee0619/LDM3D-LAPT',
      desc: {
        en: '3D latent diffusion with lesion-aware post-training for DWI/ADC synthesis from CT perfusion.',
        ko: 'CT 관류영상에서 DWI/ADC를 합성하는 3D 잠재 확산 모델 (병변 인지 후처리 학습).'
      }
    },
    {
      name: 'BoxPINN', kind: 'research', lang: 'Python', repo: 'jhlee0619/BoxPINN',
      desc: {
        en: 'Minimal implementation of BoxPINN for CT perfusion reconstruction.',
        ko: 'CT 관류 재구성을 위한 BoxPINN 최소 구현.'
      }
    },
    {
      name: 'GlioSurv', kind: 'research', lang: 'Python', repo: 'snuh-rad-aicon/GlioSurv',
      desc: {
        en: 'Multimodal transformer for survival prediction in diffuse glioma (npj Digital Medicine 2025).',
        ko: '미만성 신경교종 생존 예측을 위한 멀티모달 트랜스포머 (npj Digital Medicine 2025).'
      }
    },
    {
      name: 'Interactive-MEN-RT', kind: 'research', lang: 'Python', repo: 'snuh-rad-aicon/Interactive-MEN-RT',
      desc: {
        en: 'Interactive 3D segmentation for meningioma radiotherapy planning (MICCAI CLIP workshop 2025).',
        ko: '수막종 방사선치료 계획용 인터랙티브 3D 분할 (MICCAI CLIP 워크숍 2025).'
      }
    }
  ],

  awards: [
    { year: 2026, title: { en: 'Youlchon AI Young Researcher Fellowship', ko: '율촌 AI Young Researcher 장학생' }, org: { en: 'Youlchon Foundation', ko: '율촌재단' } },
    { year: 2026, title: { en: 'Outstanding Research Paper Award', ko: '우수연구논문상' }, org: { en: 'SNUH Biomedical Research Institute', ko: '서울대학교병원 의생명연구원' } },
    { year: 2024, title: { en: 'Magna Cum Laude', ko: 'Magna Cum Laude' }, org: { en: 'ISMRM 2024 Annual Meeting', ko: '국제자기공명의학회 (ISMRM 2024)' } },
    { year: 2023, title: { en: 'Best Oral Presentation — Silver', ko: '우수 구연 발표상 (은상)' }, org: { en: 'Korean Society of AI in Medicine (KOSAIM)', ko: '대한의료인공지능학회 (KOSAIM)' } },
    { year: 2023, title: { en: 'Best Poster Presentation — Imaging I', ko: '우수 포스터상 (Imaging I)' }, org: { en: 'Korean Society of AI in Medicine (KOSAIM)', ko: '대한의료인공지능학회 (KOSAIM)' } },
    { year: 2023, title: { en: 'Best Trainee Scientific Award — Gold', ko: 'Best Trainee Scientific Award (금상)' }, org: { en: 'ICMRI 2023 / KSMRM', ko: 'ICMRI 2023 / 대한자기공명의과학회' } },
    { year: 2021, title: { en: '3rd Place, PAIP 2021 Challenge', ko: 'PAIP 2021 챌린지 3위' }, org: { en: 'MICCAI 2021 Satellite Event', ko: 'MICCAI 2021 위성 행사' } }
  ],

  timeline: [
    {
      year: '2015', title: { en: 'B.S., Electronics Engineering', ko: '전자공학 학사' },
      body: { en: 'Hankuk University of Foreign Studies.', ko: '한국외국어대학교.' }
    },
    {
      year: '2021', title: { en: 'PAIP 2021 Challenge', ko: 'PAIP 2021 챌린지' },
      body: { en: 'Placed 3rd in a pathology AI challenge held with MICCAI 2021.', ko: 'MICCAI 2021과 함께 열린 병리 AI 챌린지에서 3위.' }
    },
    {
      year: '2022', title: { en: 'M.S., Biomedical Engineering', ko: '의공학 석사' },
      body: { en: 'Hankuk University of Foreign Studies — my first steps into medical imaging.', ko: '한국외국어대학교 — 의료영상 연구를 시작했습니다.' }
    },
    {
      year: '2023', title: { en: 'Ph.D., SNU College of Medicine', ko: '서울대 의과대학 박사과정' },
      body: { en: 'Joined AICON Lab at SNUH (Prof. Kyu Sung Choi). Presented perfusion and DCE-MRI work at KOSAIM and ICMRI.', ko: '서울대병원 AICON Lab(최규성 교수) 합류. KOSAIM·ICMRI에서 관류·DCE-MRI 연구 발표.' }
    },
    {
      year: '2024', title: { en: 'First journal paper', ko: '첫 저널 논문' },
      body: { en: 'DCE-MRI super-resolution and denoising in Scientific Reports. Abstract at ISMRM 2024.', ko: 'Scientific Reports에 DCE-MRI 초해상도·잡음 제거 논문 게재. ISMRM 2024 발표.' }
    },
    {
      year: '2025', title: { en: 'Survival prediction and image synthesis', ko: '생존 예측과 영상 합성' },
      body: { en: 'GlioSurv (npj Digital Medicine), lesion-aware diffusion (MICCAI), ST-SRPerf (CBM), plus papers in PLOS ONE and a MICCAI workshop.', ko: 'GlioSurv(npj Digital Medicine), 병변 인지 확산 모델(MICCAI), ST-SRPerf(CBM), PLOS ONE·MICCAI 워크숍 논문.' }
    },
    {
      year: '2026', title: { en: 'Context, safety, and small tools', ko: '문맥·안전성, 그리고 작은 도구들' },
      body: { en: 'Benchmarks on clinical context and safety (MC-CXR, MPIB, MedLayBench-V), EPPINN and PIRTA at MICCAI, and a few open-source tools.', ko: '임상 문맥·안전성 벤치마크(MC-CXR, MPIB, MedLayBench-V), MICCAI의 EPPINN·PIRTA, 그리고 몇 가지 오픈소스 도구.' }
    },
    {
      year: '2027', next: true, title: { en: 'Next', ko: '다음' },
      body: { en: 'Expecting to finish my Ph.D. in August 2027.', ko: '2027년 8월 박사 졸업 예정.' }
    }
  ],

  stack: [
    'Python', 'PyTorch', 'Transformers', 'Diffusion models', 'Implicit neural representations', 'Neural ODEs',
    'Physics-informed NNs', 'Uncertainty quantification', 'Survival analysis', 'Segmentation', 'LLM / VLM evaluation',
    'RAG', 'MCP', 'TypeScript', 'Brain MRI', 'CT perfusion'
  ]
};

/* UI strings. Keys referenced via data-i18n / data-i18n-html in index.html. */
window.I18N = {
  en: {
    'nav.research': 'Research', 'nav.oss': 'Code',
    'nav.papers': 'Papers', 'nav.about': 'About', 'nav.contact': 'Contact',

    'hero.badge': '<b>New</b> · MPIB benchmark data and evaluation code are public',
    'hero.title': 'Medical imaging AI for <span class="grad">imperfect clinical data.</span>',
    'hero.sub': 'I’m Junhyeok Lee, a Ph.D. student at Seoul National University College of Medicine. With colleagues at SNUH’s AICON Lab, I work on multimodal, generative, and physics-informed models for clinical data that is noisy, incomplete, or context-dependent.',
    'hero.meta': 'AICON Lab · Department of Radiology, Seoul National University Hospital',
    'hero.cta1': 'See research', 'hero.cta2': 'Contact',
    'hero.hint': 'Move your cursor over the scan to recover the signal',
    'hero.observed': 'observed', 'hero.recovered': 'recovered',


    'platform.roadmap': 'What’s next',
    'platform.observe': 'Observe', 'platform.understand': 'Understand', 'platform.reason': 'Reason', 'platform.act': 'Act',
    'platform.roadmapText': 'So far my work has focused on <b>understanding</b> and <b>reasoning</b> from imperfect data. Next, I’d like to learn how such systems can <b>act</b> safely — with uncertainty gating, human oversight, and closed-loop validation.',

    'research.eyebrow': 'Research',
    'research.title': 'One question, four directions.',
    'research.sub': 'Clinical AI rarely sees a complete patient: images are missing, evidence is mixed, measurements are noisy, and context can mislead. Each direction below looks at one part of this problem, shown through one representative paper and its method.',
    'research.related': 'Related work',
    'method.label': 'Method', 'method.enlarge': 'Enlarge figure',
    'fig.g': 'MRI is encoded by a vision transformer; clinical, genetic, and treatment information is written as text and encoded by language-model transformers. Survival queries attend to every modality in a transformer decoder with masked cross-attention.',
    'fig.l': 'CT perfusion conditions a latent diffusion model. In post-training, one-step denoised latents are decoded back to image space, where lesion-masked and image losses are added to the latent loss.',
    'fig.e': 'Hash-grid–encoded networks represent the arterial input function, tissue concentration, and perfusion parameters together with evidential parameters (α, β, ν). Training combines a data loss, the perfusion physics residual, and an evidential NLL, giving CBF, CBV, MTT, Δt and Tmax maps with total uncertainty.',
    'fig.c': 'MC-CXR keeps the current chest X-ray and target finding fixed and tests three settings — no context, reliable context, and misleading context — scoring failures by switch-to-wrong and context-aligned error rates.',
    'fig.m': 'MPIB compares benign and compromised retrieval-augmented generation across four clinical scenarios — explanation, dosing, triage, and guidelines — with adversarial instructions injected into the retrieved context.',
    'work.problem': 'Problem', 'work.approach': 'Approach', 'work.result': 'Result',
    'work.paper': 'Paper', 'work.code': 'Code', 'work.data': 'Dataset',

    'g.title': 'GlioSurv — multimodal survival prediction for diffuse glioma',
    'g.problem': 'Prognosis depends on imaging, clinical, genetic, and treatment information that is rarely all available.',
    'g.approach': 'Separate encoders per modality with masked cross-attention, so missing inputs are skipped; a pretrained, frozen vision encoder keeps high-dimensional imaging from dominating training.',
    'g.result': 'Validated on 1,944 patients from four cohorts; prediction improved as more information was added (C-index 0.69 → 0.80 in the internal cohort).',
    'l.title': 'Lesion-aware latent diffusion — CT perfusion to diffusion MRI',
    'l.problem': 'In acute stroke, diffusion MRI shows the lesion best, but CT perfusion is often what is quickly available.',
    'l.approach': 'Latent diffusion is efficient but can lose small lesions, so we added a lesion-weighted, pixel-space post-training stage.',
    'l.result': 'On 817 patients, post-training reproduced lesions more accurately than the base model (ADC lesion MAE 0.125 → 0.105).',
    'e.title': 'EPPINN — physics-informed perfusion with evidential uncertainty',
    'e.problem': 'Stroke CT perfusion is sparsely sampled and noisy, so blood-flow maps can be unstable, and standard methods don’t say how far to trust them.',
    'e.approach': 'Perfusion physics is part of the loss; an evidential head estimates the uncertainty of the physics residual without extra sampling. About 50 s per case.',
    'e.result': 'In a sensitivity-prioritized setting, it detected the infarct core in 41 of 42 clinical cases, and its uncertainty correlated with the physics residual.',
    'c.title': 'MC-CXR & MPIB — which context should a model trust?',
    'c.problem': 'Radiologists read images alongside history, prior scans, and reports, but most benchmarks test images in isolation — and LLM pipelines can be steered by injected instructions.',
    'c.approach': 'Keep the image fixed and change only the context: MC-CXR pairs reliable and misleading text and prior images, and MPIB collects direct and RAG-mediated prompt-injection cases scored by clinical harm.',
    'c.result': 'Misleading text flipped correct image-only answers far more often than misleading images (45.6–78.1% across text sources).',
    'oss.eyebrow': 'Code',
    'oss.title': 'Code and tools.',
    'oss.sub': 'Code for most of the papers above, plus a few small tools I made for checking AI-generated references and experiments.',
    'oss.all': 'All', 'oss.tool': 'Tools', 'oss.research': 'Research code', 'oss.data': 'Datasets',
    'oss.demo': 'Demo', 'oss.copy': 'Copy', 'oss.copied': 'Copied',

    'pubs.eyebrow': 'Papers',
    'pubs.title': 'Publications',
    'pubs.search': 'Search titles, venues, co-authors…',
    'pubs.all': 'All', 'pubs.journal': 'Journals', 'pubs.conference': 'Conferences',
    'pubs.empty': 'No papers match that filter.',
    'pubs.scholar': 'Google Scholar',

    'rec.eyebrow': 'Awards',
    'rec.title': 'Awards',
    'rec.press': 'Interview',
    'rec.bric': 'BRIC Hanbitsa interview about the GlioSurv study.',

    'journey.eyebrow': 'Background',
    'journey.title': 'From circuits to clinics.',

    'about.eyebrow': 'About',
    'about.title': 'A bit about me.',
    'about.body': 'I started in electronics engineering, moved to biomedical engineering, and now study medical imaging AI at Seoul National University Hospital’s AICON Lab, advised by Prof. Kyu Sung Choi. I’m most interested in problems where the data is imperfect and mistakes matter — acute stroke imaging, glioma prognosis, and the safety of language models used with clinical text.',
    'about.principles': 'How I try to work',
    'about.p1t': 'Check before trusting', 'about.p1': 'I try to accept AI-generated code or text only after running it or checking it against a source.',
    'about.p2t': 'Mind the clinical cost', 'about.p2': 'Errors are not equally costly — a missed lesion matters more than the average pixel.',
    'about.p3t': 'Be clear about limits', 'about.p3': 'Say what a result shows, and what it doesn’t.',
    'about.stack': 'Tools I use',

    'contact.title': 'Say hello.',
    'contact.sub': 'Happy to talk about medical imaging, multimodal models, or clinical AI safety. Questions about the papers or code are welcome too.',
    'contact.email': 'Email me', 'contact.copy': 'Copy address', 'contact.copied': 'Copied!',

    'footer.built': 'Built with HTML, CSS & JavaScript. Hosted on GitHub Pages.',
    'footer.updated': 'Updated Oct 2026',

    'cmd.placeholder': 'Type a command or search…', 'cmd.go': 'Go to', 'cmd.open': 'Open', 'cmd.action': 'Action',
    'cmd.lang': 'Switch to 한국어', 'cmd.theme': 'Toggle light / dark', 'cmd.copyEmail': 'Copy email address',
    'cmd.empty': 'No results'
  },

  ko: {
    'nav.research': '연구', 'nav.oss': '코드',
    'nav.papers': '논문', 'nav.about': '소개', 'nav.contact': '연락하기',

    'hero.badge': '<b>공개</b> · MPIB 벤치마크 데이터와 평가 코드',
    'hero.title': '<span class="grad">불완전한 임상 데이터</span>를 다루는 의료영상 AI를 연구합니다.',
    'hero.sub': '서울대학교 의과대학 박사과정 이준혁입니다. 서울대학교병원 AICON Lab 동료들과 함께, 잡음이 있거나 일부가 빠져 있거나 문맥에 따라 해석이 달라지는 임상 데이터를 위한 멀티모달·생성·물리 기반 모델을 연구하고 있습니다.',
    'hero.meta': '서울대학교병원 영상의학과 AICON Lab',
    'hero.cta1': '연구 보기', 'hero.cta2': '연락하기',
    'hero.hint': '스캔 위로 커서를 움직여 신호를 복원해 보세요',
    'hero.observed': '관측', 'hero.recovered': '복원',


    'platform.roadmap': '앞으로',
    'platform.observe': '관측', 'platform.understand': '이해', 'platform.reason': '추론', 'platform.act': '행동',
    'platform.roadmapText': '지금까지는 불완전한 데이터를 <b>이해</b>하고 <b>추론</b>하는 데 집중했습니다. 앞으로는 이런 시스템이 불확실성 게이팅·사람의 감독·폐루프 검증을 갖추고 안전하게 <b>행동</b>하는 방법을 배우고 싶습니다.',

    'research.eyebrow': '연구',
    'research.title': '하나의 질문, 네 가지 방향.',
    'research.sub': '임상 AI가 환자를 완전하게 보는 경우는 드뭅니다. 영상은 빠져 있고, 근거는 섞여 있고, 측정에는 잡음이 있고, 문맥은 오해를 부르기도 합니다. 아래 네 방향은 각각 이 문제의 한 부분을 다루며, 방향마다 대표 논문 한 편과 그 방법을 소개합니다.',
    'research.related': '관련 연구',
    'method.label': '방법', 'method.enlarge': '그림 확대',
    'fig.g': 'MRI는 비전 트랜스포머로, 임상·유전·치료 정보는 문장으로 바꿔 언어모델 트랜스포머로 인코딩합니다. 생존 쿼리가 masked cross-attention을 갖춘 트랜스포머 디코더에서 각 모달리티를 참조합니다.',
    'fig.l': 'CT 관류영상을 조건으로 잠재 확산 모델을 학습합니다. 후처리 학습에서는 한 단계 디노이징한 잠재 벡터를 영상 공간으로 복원해, 잠재 손실에 병변 마스크 손실과 영상 손실을 더합니다.',
    'fig.e': '해시 그리드로 인코딩한 신경망이 동맥 입력 함수, 조직 농도, 관류 파라미터와 증거 파라미터(α, β, ν)를 표현합니다. 데이터 손실, 관류 물리 잔차, 증거 기반 NLL을 함께 학습해 CBF·CBV·MTT·Δt·Tmax 지도와 전체 불확실성을 얻습니다.',
    'fig.c': 'MC-CXR은 현재 흉부 X-ray와 목표 소견을 고정하고 문맥 없음·신뢰 문맥·오도 문맥 세 조건을 시험하며, 오답 전환율과 문맥 정렬 오류율로 실패를 측정합니다.',
    'fig.m': 'MPIB는 설명·투약·분류·가이드라인 네 가지 임상 시나리오에서 정상 RAG와, 검색 문맥에 악성 지시가 주입된 RAG를 비교합니다.',
    'work.problem': '문제', 'work.approach': '접근', 'work.result': '결과',
    'work.paper': '논문', 'work.code': '코드', 'work.data': '데이터셋',

    'g.title': 'GlioSurv — 미만성 신경교종 멀티모달 생존 예측',
    'g.problem': '예후 판단에는 영상·임상·유전·치료 정보가 필요하지만, 이 정보가 모두 갖춰지는 경우는 드뭅니다.',
    'g.approach': '모달리티별 인코더와 masked cross-attention으로 빠진 입력은 건너뛰게 했고, 사전학습 후 고정한 비전 인코더로 고차원 영상 특징이 학습을 지배하지 않도록 했습니다.',
    'g.result': '4개 코호트 1,944명으로 검증했고, 정보를 더할수록 예측이 좋아졌습니다(내부 코호트 C-index 0.69 → 0.80).',
    'l.title': '병변 인지 잠재 확산 모델 — CT 관류영상에서 확산 MRI 합성',
    'l.problem': '급성 뇌졸중에서 병변은 확산 MRI가 가장 잘 보여주지만, 빠르게 얻을 수 있는 건 주로 CT 관류영상입니다.',
    'l.approach': '잠재 확산 모델은 효율적이지만 작은 병변을 놓칠 수 있어, 병변에 가중치를 둔 픽셀 공간 후처리 학습 단계를 추가했습니다.',
    'l.result': '817명 데이터에서 기본 모델보다 병변을 더 정확하게 재현했습니다(ADC 병변 MAE 0.125 → 0.105).',
    'e.title': 'EPPINN — 증거 기반 불확실성을 갖춘 물리 기반 관류 모델',
    'e.problem': '뇌졸중 CT 관류영상은 촬영 간격이 성기고 잡음이 커서 혈류 지표가 불안정할 수 있고, 기존 방법은 결과를 얼마나 믿을지 알려주지 않습니다.',
    'e.approach': '관류 물리식을 손실함수에 넣고, 증거 기반 헤드로 물리 잔차의 불확실성을 추가 샘플링 없이 추정합니다. 케이스당 약 50초.',
    'e.result': '민감도 우선 설정에서 임상 42명 중 41명의 뇌경색 코어를 검출했고, 불확실성은 물리 잔차와 상관을 보였습니다.',
    'c.title': 'MC-CXR & MPIB — 모델은 어떤 문맥을 믿어야 할까?',
    'c.problem': '영상의학과 의사는 병력·이전 영상·판독문을 함께 보지만, 대부분의 벤치마크는 영상만 따로 평가합니다. 또 LLM 파이프라인은 주입된 지시에 휘둘릴 수 있습니다.',
    'c.approach': '영상은 고정하고 문맥만 바꿉니다. MC-CXR은 신뢰할 수 있는 문맥과 오도하는 텍스트·이전 영상을 짝지어 제시하고, MPIB는 직접·RAG 경유 프롬프트 인젝션 사례를 임상 위해 기준으로 평가합니다.',
    'c.result': '오도하는 텍스트는 오도하는 영상보다 훨씬 자주 정답을 뒤집었습니다(텍스트 출처별 45.6–78.1%).',
    'oss.eyebrow': '코드',
    'oss.title': '코드와 도구.',
    'oss.sub': '위 논문 대부분의 코드와, AI가 만든 참고문헌·실험 결과를 확인하려고 만든 작은 도구들입니다.',
    'oss.all': '전체', 'oss.tool': '도구', 'oss.research': '연구 코드', 'oss.data': '데이터셋',
    'oss.demo': '데모', 'oss.copy': '복사', 'oss.copied': '복사됨',

    'pubs.eyebrow': '논문',
    'pubs.title': '논문 목록',
    'pubs.search': '제목, 학회, 공저자 검색…',
    'pubs.all': '전체', 'pubs.journal': '저널', 'pubs.conference': '학회',
    'pubs.empty': '조건에 맞는 논문이 없습니다.',
    'pubs.scholar': 'Google Scholar',

    'rec.eyebrow': '수상',
    'rec.title': '수상',
    'rec.press': '인터뷰',
    'rec.bric': 'GlioSurv 연구에 관한 BRIC 한빛사 인터뷰.',

    'journey.eyebrow': '이력',
    'journey.title': '회로에서 임상으로.',

    'about.eyebrow': '소개',
    'about.title': '조금 더 소개하면.',
    'about.body': '전자공학으로 시작해 의공학을 거쳐, 지금은 서울대학교병원 AICON Lab에서 최규성 교수님의 지도로 의료영상 AI를 연구하고 있습니다. 데이터가 불완전하고 실수의 대가가 큰 문제 — 급성 뇌졸중 영상, 신경교종 예후, 임상 텍스트를 다루는 언어모델의 안전성 — 에 관심이 많습니다.',
    'about.principles': '일할 때 지키려는 것',
    'about.p1t': '확인한 뒤에 믿기', 'about.p1': 'AI가 만든 코드나 글은 직접 실행하거나 출처와 대조한 뒤에 받아들이려고 합니다.',
    'about.p2t': '임상적 비용 생각하기', 'about.p2': '모든 오차의 비용이 같지 않습니다. 평균 픽셀 오차보다 놓친 병변이 더 중요합니다.',
    'about.p3t': '한계를 분명히', 'about.p3': '결과가 보여주는 것과 보여주지 않는 것을 구분해서 말하려고 합니다.',
    'about.stack': '사용하는 도구',

    'contact.title': '편하게 연락 주세요.',
    'contact.sub': '의료영상, 멀티모달 모델, 임상 AI 안전성에 관한 이야기라면 언제든 환영합니다. 논문이나 코드에 관한 질문도 좋습니다.',
    'contact.email': '이메일 보내기', 'contact.copy': '주소 복사', 'contact.copied': '복사됨!',

    'footer.built': 'HTML, CSS, JavaScript로 만들고 GitHub Pages로 호스팅합니다.',
    'footer.updated': '2026년 10월 업데이트',

    'cmd.placeholder': '명령어 또는 검색어 입력…', 'cmd.go': '이동', 'cmd.open': '열기', 'cmd.action': '실행',
    'cmd.lang': 'Switch to English', 'cmd.theme': '라이트 / 다크 전환', 'cmd.copyEmail': '이메일 주소 복사',
    'cmd.empty': '결과 없음'
  }
};
