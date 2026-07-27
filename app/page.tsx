'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';

const skills = [
  {
    title: 'Recruitment & HR',
    text: 'Full cycle recruitment, интервью, onboarding, адаптация, HR-аналитика, performance review, KPI.',
  },
  {
    title: 'Adult Industry',
    text: 'OnlyFans, Fansly, Webcam, а также трафик и продвижение через Instagram, TikTok, YouTube и Twitter/X.',
  },
  {
    title: 'Automation',
    text: 'Telegram-боты, CRM-логика, базы кандидатов, Google Sheets, AI-инструменты и воронки найма.',
  },
];

const experience = [
  {
    role: 'HRD / Head of Recruitment',
    company: 'OnlyFans / Fansly',
    text: 'Руководство отделом рекрутинга, построение системы найма с нуля, регламенты, скрипты интервью, KPI и retention-аналитика.',
  },
  {
    role: 'Recruitment Team Lead',
    company: 'Команда рекрутеров',
    text: 'Обучение новых сотрудников, проверка качества интервью, контроль конверсий воронки найма и единые стандарты оценки кандидатов.',
  },
  {
    role: 'HR / Recruiter',
    company: 'Массовый и точечный подбор',
    text: 'Подбор chatters, models, operators, recruiters, content managers, SMM, Team Lead и management. Платформы Instagram, TikTok, YouTube и Twitter/X использовал для трафика и продвижения.',
  },
];

const process = [
  {
    step: '01',
    title: 'Поиск',
    text: 'Строю каналы привлечения через соцсети, Telegram и referral-источники, а для трафика и продвижения использую Instagram, TikTok, YouTube и Twitter/X.',
  },
  {
    step: '02',
    title: 'Отбор',
    text: 'Использую скрипты интервью, критерии оценки и контроль качества коммуникации.',
  },
  {
    step: '03',
    title: 'Удержание',
    text: 'Слежу за адаптацией, отчётностью, причинами увольнений и улучшением процессов на основе данных.',
  },
];

const whyHire = [
  {
    title: 'Полный цикл рекрутинга',
    text: 'Поиск кандидатов, интервью, onboarding, адаптация, HR-аналитика и контроль качества найма.',
  },
  {
    title: 'Управление командой рекрутеров',
    text: 'Обучение новых сотрудников, проверка качества интервью и контроль конверсий воронки найма.',
  },
  {
    title: 'Автоматизация и CRM',
    text: 'Telegram-боты, CRM-логика, базы кандидатов, Google Sheets и AI-инструменты.',
  },
];

const achievements = [
  {
    value: 4.5,
    decimals: 1,
    suffix: '+',
    label: 'года в HR и рекрутинге',
  },
  {
    value: 9,
    suffix: '+',
    label: 'источников поиска кандидатов',
  },
  {
    value: 3,
    suffix: '',
    label: 'ключевые роли в карьере',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 16, mass: 0.85 },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.11,
    },
  },
};

const MOTION_TUNING = {
  parallaxRange: 22,
};

function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || !ref.current) {
      return;
    }

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        setHasAnimated(true);

        const startTime = performance.now();
        const duration = 1400;

        const frame = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(value * eased);

          if (progress < 1) {
            requestAnimationFrame(frame);
          }
        };

        requestAnimationFrame(frame);
      },
      { threshold: 0.55 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString('ru-RU', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 170, damping: 28, mass: 0.3 });

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const cursorXSmooth = useSpring(cursorX, { stiffness: 220, damping: 30, mass: 0.2 });
  const cursorYSmooth = useSpring(cursorY, { stiffness: 220, damping: 30, mass: 0.2 });

  const primaryCtaX = useMotionValue(0);
  const primaryCtaY = useMotionValue(0);
  const primaryCtaXSmooth = useSpring(primaryCtaX, { stiffness: 280, damping: 24, mass: 0.22 });
  const primaryCtaYSmooth = useSpring(primaryCtaY, { stiffness: 280, damping: 24, mass: 0.22 });

  const heroContentY = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : 44]);
  const heroCardY = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : -34]);
  const orbOneY = useTransform(scrollY, [0, 1200], [0, shouldReduceMotion ? 0 : -42]);
  const orbTwoY = useTransform(scrollY, [0, 1200], [0, shouldReduceMotion ? 0 : 34]);
  const tiltHover = shouldReduceMotion ? {} : { y: -6, scale: 1.01 };

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      lerp: 0.1,
      smoothWheel: true,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia('(pointer:fine)').matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section--parallax'));
    if (sections.length === 0) {
      return;
    }

    let frameId = 0;
    const updateParallax = () => {
      const viewportCenter = window.innerHeight * 0.5;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height * 0.5;
        const distance = (sectionCenter - viewportCenter) / window.innerHeight;
        const direction = index % 2 === 0 ? 1 : -1;
        const shift =
          Math.max(-MOTION_TUNING.parallaxRange, Math.min(MOTION_TUNING.parallaxRange, distance * MOTION_TUNING.parallaxRange)) *
          direction;
        section.style.setProperty('--section-parallax', `${shift.toFixed(2)}px`);
      });
      frameId = requestAnimationFrame(updateParallax);
    };

    frameId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia('(pointer:fine)').matches) {
      return;
    }

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.motion-tilt'));
    if (cards.length === 0) {
      return;
    }

    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 9;
        const rotateX = (0.5 - py) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
      };

      const onLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
        card.style.transform = '';
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [shouldReduceMotion]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section--glow'));
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section--in-view');
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -8% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-shell">
      <div className="scroll-progress" aria-hidden="true">
        <motion.span style={{ scaleX: progressScale }} />
      </div>

      <motion.div className="cursor-glow" aria-hidden="true" style={{ x: cursorXSmooth, y: cursorYSmooth }} />

      <motion.div
        className="orb orb--one"
        style={{ y: orbOneY }}
        animate={{ y: [0, -18, 0], x: [0, 10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb--two"
        style={{ y: orbTwoY }}
        animate={{ y: [0, 16, 0], x: [0, -12, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.5 }}
      />

      <header className="hero">
        <nav className="topbar">
          <div className="brand">VS</div>
          <a className="topbar__link liquid" href="#contact">
            Написать
          </a>
        </nav>

        <motion.div className="hero__grid" variants={container} initial="hidden" animate="visible">
          <motion.section className="hero__content" variants={reveal} style={{ y: heroContentY }}>
            <p className="eyebrow">HRD / Head of Recruitment / Recruitment Team Lead</p>
            <h1>HRD / Head of Recruitment с опытом в adult-индустрии и командном рекрутинге.</h1>
            <p className="lead">
              Владислав Савчук. Более 4,5 лет опыта в adult-индустрии (OnlyFans, Fansly, Webcam). Специализируюсь на
              полном цикле рекрутинга, управлении командой рекрутеров, автоматизации HR-процессов и поиске сотрудников
              через соцсети, Telegram и referral-каналы.
            </p>

            <div className="hero__chips" aria-label="Ключевые направления">
              {['Full cycle recruitment', 'Team leadership', 'Automation'].map((chip) => (
                <motion.span key={chip} whileHover={{ y: -3, scale: 1.03 }} transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
                  {chip}
                </motion.span>
              ))}
            </div>

            <div className="hero__actions">
              <motion.a
                className="button button--primary liquid"
                href="#experience"
                style={{ x: primaryCtaXSmooth, y: primaryCtaYSmooth }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const px = (event.clientX - rect.left) / rect.width - 0.5;
                  const py = (event.clientY - rect.top) / rect.height - 0.5;
                  primaryCtaX.set(px * 14);
                  primaryCtaY.set(py * 10);
                }}
                onMouseLeave={() => {
                  primaryCtaX.set(0);
                  primaryCtaY.set(0);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.965 }}
              >
                Смотреть опыт
              </motion.a>
              <motion.a className="button button--ghost liquid" href="#contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Telegram
              </motion.a>
            </div>

            <div className="hero__stats">
              {[
                ['4,5+', 'года в HR и рекрутинге'],
                ['Full Cycle', 'подбор от поиска до адаптации'],
                ['Automation', 'боты, CRM, KPI и воронки найма'],
              ].map(([value, label]) => (
                <article key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.aside className="hero__card motion-tilt" variants={reveal} style={{ y: heroCardY }}>
            <div className="profile-card">
              <div className="profile-card__badge">HR experience</div>
              <h2>Полный цикл найма и управление HR-процессами.</h2>
              <p>
                Массовый и точечный подбор, построение HR-процессов, управление удалёнными командами и аналитика
                эффективности.
              </p>

              <ul className="checklist">
                <li>Подбор чаттеров, моделей, операторов, рекрутеров, SMM и Team Lead</li>
                <li>Построение отделов рекрутинга с нуля</li>
                <li>Скрипты интервью, KPI и retention-аналитика</li>
                <li>Telegram-боты, CRM-логика и Google Sheets</li>
              </ul>
            </div>
          </motion.aside>
        </motion.div>
      </header>

      <section className="section section--glow section--parallax">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Что подтверждает опыт</motion.p>
          <motion.h2 variants={reveal}>Коротко и по делу: масштаб роли, источники и специализация.</motion.h2>
        </motion.div>

        <motion.div className="achievement-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {achievements.map((item, index) => (
            <motion.article key={item.label} className="achievement-card motion-tilt" variants={reveal} whileHover={tiltHover} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
              <div className="achievement-card__number">
                <AnimatedCounter value={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} />
              </div>
              <p>{item.label}</p>
              <span>0{index + 1}</span>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section--glow section--parallax">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Почему меня нанимают</motion.p>
          <motion.h2 variants={reveal}>Потому что я закрываю не только вакансии, а саму функцию найма.</motion.h2>
        </motion.div>

        <motion.div className="why-hire-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {whyHire.map((item) => (
            <motion.article key={item.title} className="why-hire-card motion-tilt" variants={reveal}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section--glow section--parallax">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>О себе</motion.p>
          <motion.h2 variants={reveal}>Не просто закрываю вакансии, а выстраиваю работающую систему найма.</motion.h2>
        </motion.div>

        <motion.div className="about-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div className="panel" variants={reveal}>
            <p>Работаю как с массовым подбором, так и с позициями уровня Team Lead и Management. Сильная сторона — соединять рекрутинг, аналитику и автоматизацию в один управляемый процесс.</p>
          </motion.div>
          <motion.div className="panel panel--accent" variants={reveal}>
            <p>В фокусе скорость обработки кандидатов, качество интервью, прозрачные KPI и снижение текучести через понятные процессы и регулярную обратную связь.</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="section section--glow section--parallax">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Ключевые навыки</motion.p>
          <motion.h2 variants={reveal}>Инструменты, процессы и управленческие компетенции.</motion.h2>
        </motion.div>

        <motion.div className="skills-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {skills.map((skill) => (
            <motion.article key={skill.title} className="skill-card motion-tilt" variants={reveal} whileHover={tiltHover} transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section--glow section--parallax" id="experience">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Опыт</motion.p>
          <motion.h2 variants={reveal}>Ключевые роли и результаты.</motion.h2>
        </motion.div>

        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              key={item.role}
              className="timeline__item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -54 : 54, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.78, ease: 'easeOut' }}
              whileHover={shouldReduceMotion ? {} : { y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
            >
              <div className="timeline__marker" />
              <div className="timeline__content">
                <div className="timeline__meta">{item.role}</div>
                <h3>{item.company}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section section--glow section--parallax">
        <motion.div className="section__heading" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Подход</motion.p>
          <motion.h2 variants={reveal}>Собираю рекрутинг как систему: от источника трафика до удержания.</motion.h2>
        </motion.div>

        <motion.div className="process-grid" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {process.map((item) => (
            <motion.article key={item.step} className="process-card motion-tilt" variants={reveal}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section section--glow section--parallax contact" id="contact">
        <motion.div className="contact__inner" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.p className="eyebrow" variants={reveal}>Контакт</motion.p>
          <motion.h2 variants={reveal}>Если нужен HRD или Head of Recruitment, пишите в Telegram.</motion.h2>
          <motion.a className="button button--primary liquid" href="https://t.me/salarisdan" target="_blank" rel="noreferrer" variants={reveal} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            Написать @salarisdan
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}