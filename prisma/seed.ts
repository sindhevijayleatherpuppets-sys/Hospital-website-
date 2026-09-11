import prisma from '../src/lib/prisma'
import crypto from 'crypto'

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`scrypt:${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function main() {
  const defaultHashedPassword = await hashPassword('password123');

  // Create Doctor
  await prisma.user.upsert({
    where: { email: 'doctor@ayurcare.com' },
    update: {
      name: 'Dr. Krishna Murthy (Chief Physician)',
    },
    create: {
      email: 'doctor@ayurcare.com',
      name: 'Dr. Krishna Murthy (Chief Physician)',
      password: defaultHashedPassword,
      role: 'DOCTOR',
    },
  })

  // Create Receptionist
  await prisma.user.upsert({
    where: { email: 'reception@ayurcare.com' },
    update: {},
    create: {
      email: 'reception@ayurcare.com',
      name: 'Front Desk Reception',
      password: defaultHashedPassword,
      role: 'RECEPTIONIST',
    },
  })

  // Create Patient
  const patient = await prisma.user.upsert({
    where: { email: 'patient@example.com' },
    update: {},
    create: {
      email: 'patient@example.com',
      name: 'John Doe',
      password: defaultHashedPassword,
      role: 'PATIENT',
    },
  })

  // Clear existing products & gallery to prevent duplicates
  await prisma.product.deleteMany({})
  await prisma.galleryImage.deleteMany({})

  // Add rich Ayurvedic products with real images and authentic INR prices
  await prisma.product.createMany({
    data: [
      { 
        name: 'Ashwagandha Rasayana Powder', 
        description: 'Potent adaptogen for stress reduction, cognitive clarity, and nervous system vitality.', 
        price: 299.00,
        imageUrl: '/images/ps.jpg'
      },
      { 
        name: 'Triphala Churna (Organic Detox)', 
        description: 'Classical three-fruit blend for gastrointestinal cleansing, colon detox, and digestion.', 
        price: 199.00,
        imageUrl: '/images/ps1.jpg'
      },
      { 
        name: 'Kshirabala Thailam & Brahmi Oil', 
        description: 'Traditional herbal oil formulated to relieve joint inflammation and soothe the mind.', 
        price: 349.00,
        imageUrl: '/images/ps2.jpg'
      },
      { 
        name: 'Dhanvanthari Gulika & Tablets', 
        description: 'Classical Ayurvedic tablets for respiratory relief, gastric balance, and immunity.', 
        price: 249.00,
        imageUrl: '/images/sweet.jpg'
      },
      { 
        name: 'Chyawanprash Awaleha', 
        description: 'Authentic 40-herb rejuvenation elixir rich in Vitamin C and Amla for daily vitality.', 
        price: 399.00,
        imageUrl: '/images/medical.jpg'
      },
      { 
        name: 'Mahanarayana Muscle Care Oil', 
        description: 'Deep-penetrating pain relief oil for arthritic joints and muscular rejuvenation.', 
        price: 375.00,
        imageUrl: '/images/3.jpg'
      },
    ]
  });

  // Add gallery images including authentic treatment photos
  await prisma.galleryImage.createMany({
    data: [
      { title: 'Panchakarma Detoxification Chamber', description: 'Classical herbal steam swedana and cleansing therapy', url: '/images/panchakarma.jpg' },
      { title: 'Shirodhara Medicated Oil Stream', description: 'Continuous rhythmic warm herbal oil therapy for deep mental calm', url: '/images/shirodhara.jpg' },
      { title: 'Abhyanga Full-Body Herbal Massage', description: 'Synchronized therapeutic body conditioning with warm dosha-specific oils', url: '/images/abhyanga.jpg' },
      { title: 'Elakizhi Herbal Potli Therapy', description: 'Warm steamed medicinal leaf bundles for joint and muscular pain relief', url: '/images/kizhi.jpg' },
      { title: 'Hospital Inpatient Sanctuary', description: 'Serene healing rooms with natural light and peaceful garden views', url: '/images/hsptl.jpg' },
      { title: 'Traditional Apothecary & Dispensary', description: 'In-house preparation of classical Kashayams and herbal oils', url: '/images/medical.jpg' },
    ]
  });

  // Create sample appointment with a sample digital prescription if none exists
  const existingApt = await prisma.appointment.findFirst({
    where: { patientId: patient.id }
  });

  if (!existingApt) {
    const sampleApt = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'COMPLETED',
        consultationFee: 500.0,
        paymentStatus: 'PAID_ONLINE',
        paymentMethod: 'UPI_QR',
        transactionId: 'UPI9842104821',
        disease: 'Chronic Vata Imbalance & Joint Stiffness',
      }
    });

    await prisma.prescription.create({
      data: {
        appointmentId: sampleApt.id,
        disease: 'Vata Vyadhi (Joint Pain & Digestive Sluggishness)',
        text: 'Patient advised complete 14-day herbal regimen with gentle Abhyanga oil massage before warm shower.',
        medicines: '1. Yogaraja Guggulu - 1 tablet (Twice daily after food)\n2. Dhanvantharam Kashayam - 15ml with 45ml warm water (Morning & Night)\n3. Ashwagandha Powder - 1 tsp with warm milk at bedtime',
        dosage: 'Follow strictly for 14 days. Avoid cold refrigerated water and excess spicy foods.',
        dietAdvice: 'Pathya: Warm mung soup, steamed vegetables, ghee, soaked almonds. Apathya: Cold drinks, dry snacks, irregular meal timings.'
      }
    });
  }

  console.log('Database successfully seeded with doctor, receptionist, patient, products, gallery, and prescriptions!')
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
