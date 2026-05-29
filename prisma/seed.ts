import { prisma } from '@/lib/prisma';
import {
  JUDGES_DATA, THEMES_DATA, PRIZES_DATA, TIMELINE_DATA,
  RULES_DATA, TEAM_DATA, TESTIMONIALS_DATA, STATS_DATA,
} from '@/lib/constants';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.testimonial.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.sponsor.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.winner.deleteMany();
  await prisma.project.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.judge.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.rule.deleteMany();
  await prisma.timelineItem.deleteMany();
  await prisma.prize.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.event.deleteMany();

  // Create the featured event
  const event = await prisma.event.create({
    data: {
      slug: 'ai-autonomous-smart-city-hackathon-2026',
      title: 'AI Autonomous Smart City Hackathon 2026',
      tagline: 'Building Intelligent Cities. Powered by AI.',
      description: 'The AI Autonomous Smart City Hackathon 2026 invited students worldwide to build intelligent systems that transform urban living. Participants designed AI-powered solutions enabling cities to think, adapt, and operate autonomously in real time.',
      startDate: new Date('2026-04-30'),
      endDate: new Date('2026-05-04'),
      location: 'Global Online',
      status: 'completed',
    },
  });

  console.log(`✅ Created event: ${event.title}`);

  // Seed judges
  for (const judge of JUDGES_DATA) {
    await prisma.judge.create({
      data: {
        ...judge,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${JUDGES_DATA.length} judges`);

  // Seed themes
  for (let i = 0; i < THEMES_DATA.length; i++) {
    await prisma.theme.create({
      data: {
        title: THEMES_DATA[i].title,
        description: THEMES_DATA[i].description,
        icon: THEMES_DATA[i].icon,
        order: i + 1,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${THEMES_DATA.length} themes`);

  // Seed prizes
  for (let i = 0; i < PRIZES_DATA.length; i++) {
    await prisma.prize.create({
      data: {
        title: PRIZES_DATA[i].title,
        rewards: JSON.stringify(PRIZES_DATA[i].rewards),
        order: i + 1,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${PRIZES_DATA.length} prizes`);

  // Seed timeline
  for (let i = 0; i < TIMELINE_DATA.length; i++) {
    await prisma.timelineItem.create({
      data: {
        title: TIMELINE_DATA[i].title,
        date: new Date(TIMELINE_DATA[i].date),
        status: TIMELINE_DATA[i].status,
        order: i + 1,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${TIMELINE_DATA.length} timeline items`);

  // Seed rules
  for (let i = 0; i < RULES_DATA.length; i++) {
    await prisma.rule.create({
      data: {
        content: RULES_DATA[i],
        order: i + 1,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${RULES_DATA.length} rules`);

  // Seed team members
  for (const member of TEAM_DATA) {
    await prisma.teamMember.create({
      data: {
        ...member,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${TEAM_DATA.length} team members`);

  // Seed testimonials
  for (const testimonial of TESTIMONIALS_DATA) {
    await prisma.testimonial.create({
      data: {
        ...testimonial,
        eventId: event.id,
      },
    });
  }
  console.log(`✅ Created ${TESTIMONIALS_DATA.length} testimonials`);

  // Seed sample projects
  const sampleProjects = [
    {
      name: 'SmartFlow Traffic AI',
      team: 'Team Alpha',
      members: JSON.stringify(['Aarav S.', 'Priya M.', 'Chen W.']),
      techStack: JSON.stringify(['Python', 'TensorFlow', 'OpenCV', 'React']),
      description: 'AI-powered traffic management system that uses computer vision and reinforcement learning to optimize signal timing in real-time.',
      category: 'Mobility',
      github: 'https://github.com/example/smartflow',
      eventId: event.id,
    },
    {
      name: 'EcoSense Monitor',
      team: 'Green Innovators',
      members: JSON.stringify(['Maria L.', 'James K.', 'Aisha R.']),
      techStack: JSON.stringify(['IoT', 'Python', 'AWS', 'React Native']),
      description: 'Real-time environmental monitoring platform using IoT sensors and ML for pollution prediction and alert systems.',
      category: 'Environment',
      github: 'https://github.com/example/ecosense',
      eventId: event.id,
    },
    {
      name: 'MediCity AI',
      team: 'HealthTech Pioneers',
      members: JSON.stringify(['David P.', 'Sarah L.', 'Ravi K.']),
      techStack: JSON.stringify(['PyTorch', 'FastAPI', 'Next.js', 'PostgreSQL']),
      description: 'AI diagnostic platform for urban healthcare centers with telemedicine support and predictive health analytics.',
      category: 'Healthcare',
      github: 'https://github.com/example/medicity',
      eventId: event.id,
    },
    {
      name: 'GridGenius',
      team: 'Power Rangers',
      members: JSON.stringify(['Emma T.', 'Lucas B.', 'Fatima A.']),
      techStack: JSON.stringify(['Python', 'Scikit-learn', 'Node.js', 'D3.js']),
      description: 'Smart energy grid optimization system using ML to balance renewable energy sources and reduce peak demand.',
      category: 'AI',
      github: 'https://github.com/example/gridgenius',
      eventId: event.id,
    },
    {
      name: 'SafeWatch',
      team: 'SecureTech',
      members: JSON.stringify(['Alex M.', 'Nina O.', 'Tom H.']),
      techStack: JSON.stringify(['YOLO', 'Python', 'Kafka', 'React']),
      description: 'AI-driven public safety system using computer vision for anomaly detection and real-time incident response.',
      category: 'AI',
      github: 'https://github.com/example/safewatch',
      eventId: event.id,
    },
    {
      name: 'UrbanPulse IoT',
      team: 'Connected Minds',
      members: JSON.stringify(['Hassan A.', 'Lisa W.', 'Dev P.']),
      techStack: JSON.stringify(['Arduino', 'MQTT', 'InfluxDB', 'Grafana']),
      description: 'City-wide IoT sensor network for monitoring infrastructure health, air quality, and noise levels in real-time.',
      category: 'IoT',
      github: 'https://github.com/example/urbanpulse',
      eventId: event.id,
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ Created ${sampleProjects.length} sample projects`);

  // Seed sample winners
  await prisma.winner.create({
    data: {
      projectName: 'SmartFlow Traffic AI',
      teamName: 'Team Alpha',
      members: JSON.stringify(['Aarav S.', 'Priya M.', 'Chen W.']),
      description: 'AI-powered traffic management system that uses computer vision and reinforcement learning to optimize signal timing.',
      category: 'grand',
      github: 'https://github.com/example/smartflow',
      feedback: 'Exceptional technical implementation with real-world impact potential. The use of reinforcement learning for signal optimization was innovative.',
      eventId: event.id,
    },
  });

  await prisma.winner.create({
    data: {
      projectName: 'EcoSense Monitor',
      teamName: 'Green Innovators',
      members: JSON.stringify(['Maria L.', 'James K.', 'Aisha R.']),
      description: 'Real-time environmental monitoring platform using IoT sensors and ML for pollution prediction.',
      category: 'runner',
      github: 'https://github.com/example/ecosense',
      feedback: 'Outstanding integration of IoT and machine learning. The prediction accuracy was impressive.',
      eventId: event.id,
    },
  });

  await prisma.winner.create({
    data: {
      projectName: 'MediCity AI',
      teamName: 'HealthTech Pioneers',
      members: JSON.stringify(['David P.', 'Sarah L.', 'Ravi K.']),
      description: 'AI diagnostic platform for urban healthcare centers with telemedicine and predictive health analytics.',
      category: 'second_runner',
      github: 'https://github.com/example/medicity',
      feedback: 'Impressive healthcare solution with strong feasibility. The telemedicine integration was well thought out.',
      eventId: event.id,
    },
  });
  console.log('✅ Created 3 winners');

  // Seed sample certificates
  const certRoles = ['Grand Winner', 'Runner Up', 'Second Runner Up'];
  const certNames = ['Aarav S.', 'Maria L.', 'David P.'];
  for (let i = 0; i < 3; i++) {
    await prisma.certificate.create({
      data: {
        certId: `IH-2026-${String(i + 1).padStart(4, '0')}`,
        name: certNames[i],
        role: certRoles[i],
        eventId: event.id,
        status: 'valid',
      },
    });
  }
  console.log('✅ Created 3 sample certificates');

  console.log('\n🎉 Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
