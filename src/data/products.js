// Centralized product database
export const productsData = [
  { 
    id: 1, 
    name: "Sassy Sunnipindi", 
    category: "skin-care", 
    description: "Traditional bath powder for glowing skin. Experience the timeless beauty secrets of India with our authentic Sunnipindi formulation.",
    fullDescription: "Sassy Sunnipindi is a traditional herbal bath powder that has been used for centuries in Indian households. This unique blend combines the finest natural ingredients to provide you with radiant, glowing skin. The powder works gently to exfoliate dead skin cells, brighten your complexion, and leave your skin feeling soft and refreshed. Regular use helps maintain skin health and brings out your natural glow.",
    benefits: "Natural cleansing, skin brightening, gentle exfoliation, anti-aging properties", 
    ingredients: "Turmeric, Sandalwood, Gram flour, Rose petals, Chickpea powder, Orange peel", 
    sizes: [ 
      { size: "250g", weight: "0.25 kg", price: 700, originalPrice: 850, stock: 50 }, 
      { size: "500g", weight: "0.50 kg", price: 900, originalPrice: 1100, stock: 30 }
    ], 
    rating: 4.8, 
    reviews: 156,
    images: [
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 1.jpg",
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 2.jpg",
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 3.jpg",
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 4.jpg",
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 5.jpg",
      "/images/Sassy Sunnupindi/Sassy Sunnipindi 6.jpg"
    ]
  },
  { 
    id: 2, 
    name: "Authentic Avarampoo", 
    category: "skin-care", 
    description: "Natural skin care powder with Avarampoo. Embrace the authentic tradition of natural skincare with pure Avarampoo.",
    fullDescription: "Authentic Avarampoo powder is crafted from the finest Avarampoo flowers, known for their exceptional skin benefits. This traditional formulation has been trusted for generations to provide natural nourishment and a healthy glow. The unique properties of Avarampoo help in maintaining skin elasticity, reducing signs of aging, and promoting an even skin tone.",
    benefits: "Anti-aging, skin nourishment, natural glow, even skin tone", 
    ingredients: "Avarampoo, Turmeric, Multani Mitti, Almond powder, Saffron, Sandalwood", 
    sizes: [ 
      { size: "250g", weight: "0.25 kg", price: 1200, originalPrice: 1400, stock: 45 }, 
      { size: "500g", weight: "0.50 kg", price: 1400, originalPrice: 1700, stock: 25 }
    ], 
    rating: 4.7, 
    reviews: 89,
    images: [
      "/images/Authentic Avarampoo/Authentic Avarampoo 1.jpg",
      "/images/Authentic Avarampoo/Authentic Avarampoo 2.jpg",
      "/images/Authentic Avarampoo/Authentic Avarampoo 3.jpg",
      "/images/Authentic Avarampoo/Authentic Avarampoo 4.jpg",
      "/images/Authentic Avarampoo/Authentic Avarampoo 5.jpg",
      "/images/Authentic Avarampoo/Authentic Avarampoo 6.jpg"
    ]
  },
  { 
    id: 3, 
    name: "Multani Marvel", 
    category: "skin-care", 
    description: "Premium Multani Mitti powder for skin care. Detoxify and renew your complexion with this potent clay-based powder.",
    fullDescription: "Multani Marvel is a potent clay-based powder designed specifically for oily and combination skin. Featuring Multani Mitti (Fuller's Earth), this natural formula absorbs impurities and excess sebum while soothing acne-related irritations. It brightens the skin and refines texture, resulting in a smoother, clearer complexion. Ideal for those seeking an effective deep-cleanse and oil control with Ayurvedic care.",
    benefits: "Deep cleansing, oil control, skin detoxification, pore refinement", 
    ingredients: "Multani Mitti, Neem, Sandalwood, Rose water, Tulsi, Lemon peel", 
    sizes: [ 
      { size: "250g", weight: "0.40 kg", price: 400, originalPrice: 550, stock: 60 }, 
      { size: "500g", weight: "0.65 kg", price: 600, originalPrice: 800, stock: 35 }
    ], 
    rating: 4.6, 
    reviews: 124,
    images: [
      "/images/Multani Marvel/Multani Marvel 1.jpg",
      "/images/Multani Marvel/Multani Marvel 2.jpg",
      "/images/Multani Marvel/Multani Marvel 3.jpg",
      "/images/Multani Marvel/Multani Marvel 4.jpg",
      "/images/Multani Marvel/Multani Marvel 5.jpg",
      "/images/Multani Marvel/Multani Marvel 6.jpg"
    ]
  },
  { 
    id: 4, 
    name: "Serene Sandalwood", 
    category: "skin-care", 
    description: "Pure sandalwood powder for radiant skin. Experience the luxury of pure sandalwood for a naturally radiant complexion.",
    fullDescription: "Serene Sandalwood brings you the finest quality sandalwood powder, revered for centuries for its skin-enhancing properties. This premium formulation provides a cooling effect, soothes irritated skin, and imparts a natural, healthy glow. The aromatic sandalwood not only benefits your skin but also provides a calming, meditative experience during your skincare routine.",
    benefits: "Cooling effect, skin soothing, natural fragrance, anti-inflammatory", 
    ingredients: "Pure Sandalwood, Rose petals, Turmeric, Gram flour, Saffron, Milk powder", 
    sizes: [ 
      { size: "250g", weight: "0.30 kg", price: 1500, originalPrice: 1800, stock: 40 }, 
      { size: "500g", weight: "0.55 kg", price: 1900, originalPrice: 2300, stock: 20 }
    ], 
    rating: 4.9, 
    reviews: 203,
    images: [
      "/images/Serene Sandalwood/Serene Sandalwood 1.jpg",
      "/images/Serene Sandalwood/Serene Sandalwood 2.jpg",
      "/images/Serene Sandalwood/Serene Sandalwood 3.jpg",
      "/images/Serene Sandalwood/Serene Sandalwood 4.jpg",
      "/images/Serene Sandalwood/Serene Sandalwood 5.jpg",
      "/images/Serene Sandalwood/Serene Sandalwood 6.jpg"
    ]
  },
  { 
    id: 5, 
    name: "Neem Nourish", 
    category: "skin-care", 
    description: "Neem-based skin care powder. Harness the antibacterial power of neem for clear, healthy skin.",
    fullDescription: "Neem Nourish is formulated with pure neem powder, known for its powerful antibacterial and antifungal properties. This natural remedy is perfect for acne-prone skin, helping to purify, heal, and prevent breakouts. The blend of traditional herbs works synergistically to detoxify the skin, reduce inflammation, and promote a clear, blemish-free complexion.",
    benefits: "Antibacterial, acne treatment, skin purification, reduces inflammation", 
    ingredients: "Neem powder, Turmeric, Multani Mitti, Tulsi, Aloe vera powder, Tea tree extract", 
    sizes: [ 
      { size: "250g", weight: "0.28 kg", price: 350, originalPrice: 480, stock: 55 }, 
      { size: "500g", weight: "0.52 kg", price: 530, originalPrice: 720, stock: 30 }
    ], 
    rating: 4.5, 
    reviews: 98,
    images: [
      "/images/Neem Nourish/Neem Nourish 1.jpg",
      "/images/Neem Nourish/Neem Nourish 2.jpg",
      "/images/Neem Nourish/Neem Nourish 3.jpg",
      "/images/Neem Nourish/Neem Nourish 4.jpg",
      "/images/Neem Nourish/Neem Nourish 5.jpg",
      "/images/Neem Nourish/Neem Nourish 6.jpg"
    ]
  },
  { 
    id: 6, 
    name: "Vibrant Vetiver", 
    category: "skin-care", 
    description: "Vetiver root powder for skin wellness. Cool and refresh your skin with the natural goodness of vetiver.",
    fullDescription: "Vibrant Vetiver is a unique formulation featuring the cooling and aromatic properties of vetiver root. Known for its ability to calm and refresh the skin, this powder is ideal for hot climates and stressed skin. The natural fragrance provides aromatherapy benefits while the powder works to improve skin texture and tone.",
    benefits: "Skin cooling, natural fragrance, stress relief, improves skin texture", 
    ingredients: "Vetiver root, Sandalwood, Rose petals, Gram flour, Mint, Cucumber powder", 
    sizes: [ 
      { size: "250g", weight: "0.32 kg", price: 450, originalPrice: 600, stock: 35 }, 
      { size: "500g", weight: "0.58 kg", price: 720, originalPrice: 950, stock: 25 }
    ], 
    rating: 4.7, 
    reviews: 67,
    images: [
      "/images/Vibrant Vetiver/Vibrant Vetiver 1.jpg",
      "/images/Vibrant Vetiver/Vibrant Vetiver 2.jpg",
      "/images/Vibrant Vetiver/Vibrant Vetiver 3.jpg",
      "/images/Vibrant Vetiver/Vibrant Vetiver 4.jpg",
      "/images/Vibrant Vetiver/Vibrant Vetiver 5.jpg",
      "/images/Vibrant Vetiver/Vibrant Vetiver 6.jpg"
    ]
  },
  { 
    id: 7, 
    name: "Anti Hairfall", 
    category: "hair-care", 
    description: "Natural hair fall control powder. Strengthen your hair from the roots and reduce hair fall naturally.",
    fullDescription: "Anti Hairfall powder is a powerful blend of Ayurvedic herbs specifically formulated to combat hair fall and promote hair growth. Rich in proteins and vitamins, this natural treatment strengthens hair roots, improves scalp health, and stimulates new hair growth. Regular use results in thicker, stronger, and healthier hair.",
    benefits: "Strengthens roots, reduces hair fall, promotes growth, adds volume", 
    ingredients: "Amla, Bhringraj, Fenugreek, Hibiscus, Curry leaves, Shikakai", 
    sizes: [ 
      { size: "250g", weight: "0.27 kg", price: 400, originalPrice: 550, stock: 70 }, 
      { size: "500g", weight: "0.51 kg", price: 600, originalPrice: 850, stock: 40 }
    ], 
    rating: 4.9, 
    reviews: 203,
    images: [
      "/images/Mane Magic/Anti-Hairfall.png",
      "/images/Mane Magic/Anti-Hairfall.png",
      "/productimgs/Mane Magic/Anti-Hairfall.png"
    ]
  },
  { 
    id: 8, 
    name: "Anti Oily", 
    category: "hair-care", 
    description: "Natural solution for oily hair. Control excess oil and enjoy fresh, voluminous hair.",
    fullDescription: "Anti Oily hair powder is specially formulated to tackle excessive oil production in the scalp. This natural blend absorbs excess sebum, adds volume to flat hair, and maintains scalp health. The gentle yet effective formula cleanses without stripping natural oils, leaving your hair feeling fresh and bouncy all day long.",
    benefits: "Controls oil production, adds volume, scalp health, maintains freshness", 
    ingredients: "Shikakai, Reetha, Amla, Lemon peel, Fuller's Earth, Tulsi", 
    sizes: [ 
      { size: "250g", weight: "0.26 kg", price: 350, originalPrice: 480, stock: 65 }, 
      { size: "500g", weight: "0.50 kg", price: 530, originalPrice: 720, stock: 35 }
    ], 
    rating: 4.6, 
    reviews: 145,
    images: [
      "/images/Mane Magic/Anti-Hairfall.png",
      "/images/Mane Magic/Anti-Hairfall.png",
      "/productimgs/Mane Magic/Anti-Hairfall.png"
    ]
  },
  { 
    id: 9, 
    name: "Anti Dandruff", 
    category: "hair-care", 
    description: "Natural dandruff treatment powder. Say goodbye to flakes and itching with this powerful herbal blend.",
    fullDescription: "Anti Dandruff powder is a therapeutic blend of herbs known for their antifungal and soothing properties. This natural treatment effectively fights dandruff, soothes scalp irritation, and prevents flakes from recurring. Regular use promotes a healthy, clean scalp and beautiful, dandruff-free hair.",
    benefits: "Fights dandruff, soothes scalp, prevents flakes, antimicrobial action", 
    ingredients: "Neem, Tea tree, Lemon, Multani Mitti, Fenugreek, Camphor", 
    sizes: [ 
      { size: "250g", weight: "0.28 kg", price: 380, originalPrice: 520, stock: 60 }, 
      { size: "500g", weight: "0.52 kg", price: 570, originalPrice: 780, stock: 30 }
    ], 
    rating: 4.8, 
    reviews: 178,
    images: [
      "/images/Mane Magic/Anti-Hairfall.png",
      "/images/Mane Magic/Anti-Hairfall.png",
      "/productimgs/Mane Magic/Anti-Hairfall.png"
    ]
  },
  { 
    id: 10, 
    name: "Smitha Manjan", 
    category: "oral-care", 
    description: "Traditional tooth powder for oral hygiene. Achieve naturally white teeth and healthy gums with this time-tested formula.",
    fullDescription: "Smitha Manjan is a traditional tooth powder that combines ancient wisdom with natural ingredients for complete oral care. This unique formulation helps whiten teeth naturally, strengthens gums, prevents cavities, and ensures long-lasting fresh breath. Free from harsh chemicals, it's a gentle yet effective alternative to modern toothpaste.",
    benefits: "Natural whitening, gum health, fresh breath, cavity prevention", 
    ingredients: "Clove, Cinnamon, Neem, Rock salt, Mint, Camphor, Licorice", 
    sizes: [ 
      { size: "100g", weight: "0.12 kg", price: 199, originalPrice: 280, stock: 80 }, 
      { size: "200g", weight: "0.22 kg", price: 330, originalPrice: 480, stock: 50 }
    ], 
    rating: 4.6, 
    reviews: 124,
    images: [
      "/images/Smitha Manjan/Smitha Manjan.png",
      "/images/Smitha Manjan/2644661624.jpg",
      "/images/Smitha Manjan/2350167f-5e25-4a13-8aa4-d25fae44e723.png"
    ]
  },
  { 
    id: 11, 
    name: "Radiant Rose", 
    category: "skin-care", 
    description: "Rose petal powder for radiant skin. Indulge in the luxury of roses for naturally radiant and youthful skin.",
    fullDescription: "Radiant Rose is a luxurious blend featuring pure rose petals combined with traditional herbs for ultimate skin radiance. Roses have been celebrated for centuries for their skin-beautifying properties. This powder helps tone the skin, reduce pigmentation, and impart a natural rosy glow while providing deep hydration and nourishment.",
    benefits: "Skin radiance, anti-aging, hydration, natural glow", 
    ingredients: "Rose petals, Sandalwood, Turmeric, Almond powder, Saffron, Milk powder", 
    sizes: [ 
      { size: "250g", weight: "0.29 kg", price: 400, originalPrice: 550, stock: 45 }, 
      { size: "500g", weight: "0.53 kg", price: 600, originalPrice: 850, stock: 25 }
    ], 
    rating: 4.8, 
    reviews: 142,
    images: [
      "/images/Radiant Rose/Radiant Rose.png",
      "/images/Radiant Rose/Radiant Rose.png",
      "/images/Radiant Rose/Radiant Rose.png"
    ]
  }
]

