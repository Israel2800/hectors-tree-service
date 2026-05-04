import mainImg       from './assets/images/mainImage.jpg'
import treeRemoval   from './assets/images/tree-removal.jpg'
import treeRemoval2  from './assets/images/tree-removal2.jpg'
import treeTrimming  from './assets/images/tree-trimming.jpg'
import stumpRemoval  from './assets/images/stump-removal.jpg'
import treeCare      from './assets/images/tree-care.jpg'
import img1          from './assets/images/1.jpg'
import img2          from './assets/images/2.jpg'
import img3          from './assets/images/3.jpg'
import img4          from './assets/images/4.jpg'
import img7          from './assets/images/7.jpg'
import img8          from './assets/images/8.jpg'

export const company = {
  name:         "Hector's Tree Service",
  tagline:      "Expert Tree Care You Can Trust",
  phone:        '615-401-0212',
  phoneHref:    'tel:6154010212',
  email:        'hectorstreeservice@gmail.com',
  address:      '1224 Cherrybark Dr, Smyrna, TN 37167',
  serviceAreas: 'La Vergne, Brentwood, Smyrna & Mt. Juliet, TN',
  license:      'Licensed & Insured',
  established:  2015,
  businessHours: [
    { days: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
    { days: 'Saturday',         hours: '8:00 AM – 4:00 PM' },
    { days: 'Sunday',           hours: 'Emergency Only'    },
  ],
}

export const services = [
  {
    id:        'tree-removal',
    title:     'Tree Removal',
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
    image:     treeRemoval,
    heroImage: treeRemoval2,
  },
  {
    id:        'tree-trimming',
    title:     'Tree Trimming',
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
    image:     treeTrimming,
    heroImage: treeTrimming,
  },
  {
    id:        'stump-removal',
    title:     'Stump Removal',
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
    image:     stumpRemoval,
    heroImage: stumpRemoval,
  },
  {
    id:        'tree-care',
    title:     'Tree Care & Health',
    shortDesc: 'Comprehensive health assessments, fertilization, and treatments to keep your trees thriving.',
    description:
      'Healthy trees add value, beauty, and shade to your property for decades. Our proactive care programs catch problems early — from disease and pests to structural weaknesses — so your trees live longer.',
    features: [
      'Disease diagnosis & treatment',
      'Deep root fertilization',
      'Soil aeration & amendment',
      'Integrated pest management',
      'Cable bracing & support systems',
      'Storm damage risk assessment',
    ],
    image:     treeCare,
    heroImage: treeCare,
  },
]

export const testimonials = [
  {
    id:       1,
    name:     'Sarah Johnson',
    location: 'Smyrna, TN',
    rating:   5,
    quote:    "Hector's crew was incredibly professional. They removed a massive oak threatening our home and cleaned everything up perfectly. I couldn't be happier — will absolutely call them again!",
    avatar:   'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id:       2,
    name:     'Michael Thompson',
    location: 'Brentwood, TN',
    rating:   5,
    quote:    "Fast, reliable, and very fairly priced. They trimmed all the trees in our yard and the results were stunning. My property looks completely transformed. Highly recommend!",
    avatar:   'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id:       3,
    name:     'Lisa Martinez',
    location: 'La Vergne, TN',
    rating:   5,
    quote:    "After a storm damaged several trees, Hector's team was on-site within 24 hours. Super professional, efficient, and honest pricing. This is the only tree service I'll ever call.",
    avatar:   'https://randomuser.me/api/portraits/women/68.jpg',
  },
]

export const stats = [
  { value: '500+',  label: 'Projects Completed'  },
  { value: '10+',   label: 'Years of Experience'  },
  { value: '100%',  label: 'Satisfaction Rate'    },
  { value: '24/7',  label: 'Emergency Response'   },
]

export const galleryImages = [
  { src: mainImg,      alt: 'Tree service crew at work'      },
  { src: treeRemoval,  alt: 'Large tree removal'              },
  { src: img1,         alt: 'Trimming completed'              },
  { src: img2,         alt: 'Stump grinding in progress'      },
  { src: treeTrimming, alt: 'Professional tree trimming'      },
  { src: img3,         alt: 'Tree care service'               },
  { src: stumpRemoval, alt: 'Stump removal result'            },
  { src: img4,         alt: 'Residential tree work'           },
  { src: treeCare,     alt: 'Healthy tree maintenance'        },
  { src: img7,         alt: 'Commercial property service'     },
  { src: treeRemoval2, alt: 'Storm damage cleanup'            },
  { src: img8,         alt: 'Final site cleanup'              },
]

export const faqs = [
  {
    q: 'Are you licensed and insured?',
    a: "Yes — Hector's Tree Service is fully licensed and carries general liability insurance plus workers' compensation, protecting both our clients and our crew on every job.",
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Absolutely. We provide free, no-obligation written estimates for all services. Contact us to schedule yours.',
  },
  {
    q: 'How quickly can you respond to emergency calls?',
    a: 'We offer 24/7 emergency tree service. For storm damage or imminent hazards, we typically arrive within 2–4 hours.',
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
