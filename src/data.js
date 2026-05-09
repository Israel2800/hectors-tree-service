import residentialTreeWorkImage from './assets/images/4.jpg'

export const company = {
  name: "Hector's Tree Service",
  tagline: 'Expert Tree Care You Can Trust',
  phone: '(615) 821-9862',
  phoneHref: 'tel:6158219862',
  email: 'hectorstreeservice80@gmail.com',
  emailHref: 'mailto:hectorstreeservice80@gmail.com',
  address: '300 Country Village Dr, Smyrna, TN 37167',
  mapDirectionsHref:
    'https://www.google.com/maps/search/?api=1&query=300+Country+Village+Dr,+Smyrna,+TN+37167',
  mapEmbedSrc:
    'https://maps.google.com/maps?q=300+Country+Village+Dr,+Smyrna,+TN+37167&output=embed',
  facebookHref: '#',
  instagramHref: '#',
  googleReviewsHref:
    'https://www.google.com/search?q=Hector%27s+Tree+Service+Smyrna+TN+reviews',
  tiktokHref: 'https://www.tiktok.com/search?q=hectorstreeservice',
  serviceAreas: 'La Vergne, Brentwood, Smyrna & Mt. Juliet, TN',
  license: 'Licensed & Insured',
  established: 2015,
  businessHours: [
    { days: 'Monday - Friday', hours: '7:00 AM - 5:00 PM' },
    { days: 'Saturday', hours: '7:00 AM - 5:00 PM' },
    { days: 'Sunday', hours: 'Emergency Only' },
  ],
}

export const services = [
  {
    id: 'tree-removal',
    title: 'Tree Removal',
    shortDesc: 'Safe, efficient removal of hazardous or unwanted trees, from small ornamentals to towering oaks.',
    description:
      'Our professional tree removal team safely eliminates trees that pose a risk to your home, utility lines, or landscape. We use precision equipment and strict safety protocols, leaving your property clean and secure.',
    features: [
      'Full tree removal & sectional takedown',
      'Hazardous & storm-damaged trees',
      'Emergency 24/7 response',
      'Stump grinding available on-site',
      'Complete debris cleanup & haul-away',
      'Lot and land clearing',
    ],
    imageKey: 'tree-removal',
    heroImageKey: 'tree-removal2',
  },
  {
    id: 'tree-trimming',
    title: 'Tree Trimming',
    shortDesc: 'Expert pruning to keep your trees healthy, safe, and looking their best year-round.',
    description:
      'Regular trimming extends the life of your trees and protects your property. Our certified arborists shape and prune each tree to promote healthy growth, remove deadwood, and enhance your landscape.',
    features: [
      'Crown thinning, raising & shaping',
      'Dead & crossing branch removal',
      'Vista and clearance pruning',
      'Young tree structural training',
      'Seasonal maintenance programs',
      'After-trim cleanup included',
    ],
    imageKey: 'tree-trimming',
    heroImageKey: 'tree-trimming',
  },
  {
    id: 'stump-removal',
    title: 'Stump Removal',
    shortDesc: 'Powerful stump grinding that reclaims your yard and eliminates tripping hazards permanently.',
    description:
      'Leftover stumps are eyesores that attract pests and create hazards. Our high-capacity grinders remove stumps below ground level so you can replant, sod, or pave over the area without a trace.',
    features: [
      'Grinding to below-grade depth',
      'Root flare and surface root removal',
      'Multi-stump volume discounts',
      'Eco-friendly process, no chemicals',
      'Wood chip mulch left on site or hauled',
      'Same-day service available',
    ],
    imageKey: 'stump-removal',
    heroImageKey: 'stump-removal',
  },
  {
    id: 'tree-care',
    title: 'Tree Care & Health',
    shortDesc: 'Comprehensive health assessments, fertilization, and treatments to keep your trees thriving.',
    description:
      'Healthy trees add value, beauty, and shade to your property for decades. Our proactive care programs catch problems early - from disease and pests to structural weaknesses - so your trees live longer.',
    features: [
      'Disease diagnosis & treatment',
      'Deep root fertilization',
      'Soil aeration & amendment',
      'Integrated pest management',
      'Cable bracing & support systems',
      'Storm damage risk assessment',
    ],
    imageKey: 'tree-care',
    heroImageKey: 'tree-care',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Smyrna, TN',
    rating: 5,
    quote: "Hector's crew was incredibly professional. They removed a massive oak threatening our home and cleaned everything up perfectly. I couldn't be happier - will absolutely call them again!",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Michael Thompson',
    location: 'Brentwood, TN',
    rating: 5,
    quote: 'Fast, reliable, and very fairly priced. They trimmed all the trees in our yard and the results were stunning. My property looks completely transformed. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Lisa Martinez',
    location: 'La Vergne, TN',
    rating: 5,
    quote: "After a storm damaged several trees, Hector's team was on-site within 24 hours. Super professional, efficient, and honest pricing. This is the only tree service I'll ever call.",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
]

export const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '10+', label: 'Years of Experience' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Emergency Response' },
]

export const galleryImages = [
  { imageKey: 'mainImage', alt: 'Tree service crew at work' },
  { imageKey: 'tree-removal', alt: 'Large tree removal' },
  { imageKey: '1', alt: 'Trimming completed' },
  { imageKey: '2', alt: 'Stump grinding in progress' },
  { imageKey: 'tree-trimming', alt: 'Professional tree trimming' },
  { imageKey: '3', alt: 'Tree care service' },
  { imageKey: 'stump-removal', alt: 'Stump removal result' },
  {
    imageKey: {
      src: residentialTreeWorkImage,
      width: 3024,
      height: 4032,
    },
    alt: 'Residential tree work',
  },
  { imageKey: 'tree-care', alt: 'Healthy tree maintenance' },
  { imageKey: '7', alt: 'Commercial property service' },
  { imageKey: 'tree-removal2', alt: 'Storm damage cleanup' },
  { imageKey: '8', alt: 'Final site cleanup' },
]

export const faqs = [
  {
    q: 'Are you licensed and insured?',
    a: "Yes - Hector's Tree Service is fully licensed and carries general liability insurance plus workers' compensation, protecting both our clients and our crew on every job.",
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Absolutely. We provide free, no-obligation written estimates for all services. Contact us to schedule yours.',
  },
  {
    q: 'How quickly can you respond to emergency calls?',
    a: 'We offer 24/7 emergency tree service. For storm damage or imminent hazards, we typically arrive within 2-4 hours.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve La Vergne, Brentwood, Smyrna, Mt. Juliet, and surrounding Nashville-area communities.',
  },
  {
    q: 'Do you clean up after the job?',
    a: 'Every job includes full site cleanup. We haul away all debris, leaving your property cleaner than we found it.',
  },
]
