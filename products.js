// Natural Paradise - Product Data Store
// ============================================================

const FRAGRANCE_FAMILIES = ['Oud', 'Floral', 'Woody', 'Fresh', 'Citrus', 'Oriental'];

const PRODUCTS = {
  perfumes: [
    // ── SIGNATURE PERFUMES ──────────────────────────────────
    {
      id: 'sig-001', category: 'signature', name: 'Paradise Royale',
      subtitle: 'Natural Paradise Exclusive',
      price: 189, originalPrice: 249,
      size: '100ml', longevity: '12–14 hours', sillage: 'Exceptional',
      family: 'Oud',
      topNotes: ['Saffron', 'Bergamot', 'Pink Pepper'],
      middleNotes: ['Rose Taif', 'Oud Cambodian', 'Jasmine'],
      baseNotes: ['Sandalwood', 'Ambergris', 'Musk', 'Vanilla'],
      description: 'The crown jewel of Natural Paradise. A majestic oud-rose masterpiece that opens with a burst of saffron and bergamot, revealing the sacred heart of Taif rose and Cambodian oud, resting on a warm bed of sandalwood and ambergris.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, BHT, Alpha-Isomethyl Ionone.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Bestseller', tag: 'signature',
      inStock: true, rating: 5, reviews: [
        { name: 'Layla Al Mansouri', rating: 5, date: 'May 2026', comment: 'Absolutely divine. This is luxury in a bottle. I received so many compliments on my first wear.' },
        { name: 'James Whitfield', rating: 5, date: 'April 2026', comment: 'The oud-rose combination is perfectly balanced. Not too heavy, not too light. Masterpiece.' },
        { name: 'Priya Sharma', rating: 5, date: 'March 2026', comment: 'Worth every penny. The longevity is incredible — still going strong after 12 hours.' }
      ]
    },
    {
      id: 'sig-002', category: 'signature', name: 'Velvet Orchid',
      subtitle: 'Natural Paradise Exclusive',
      price: 159, originalPrice: 199,
      size: '75ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Floral',
      topNotes: ['Mandarin', 'Grapefruit', 'Pink Pepper'],
      middleNotes: ['Black Orchid', 'Ylang-Ylang', 'Rose'],
      baseNotes: ['Tonka Bean', 'Patchouli', 'Vetiver', 'White Musk'],
      description: 'A seductive floral bouquet that blooms on the skin like midnight orchids in a tropical rainforest. Rich, feminine, and utterly captivating.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool.',
      image: 'assets/signature_perfume.jpg',
      badge: 'New', tag: 'signature',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Sofia Andrade', rating: 5, date: 'June 2026', comment: 'The most beautiful floral I have ever worn. The orchid note is so realistic.' },
        { name: 'Hannah Blake', rating: 4.5, date: 'May 2026', comment: 'Rich, feminine, and long-lasting. Perfect for evening occasions.' }
      ]
    },
    {
      id: 'sig-003', category: 'signature', name: 'Mystic Cedar',
      subtitle: 'Natural Paradise Exclusive',
      price: 169, originalPrice: 219,
      size: '100ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Woody',
      topNotes: ['Cardamom', 'Nutmeg', 'Lavender'],
      middleNotes: ['Cedarwood', 'Birch', 'Geranium'],
      baseNotes: ['Vetiver', 'Oakmoss', 'Amber', 'Grey Musk'],
      description: 'A rugged yet sophisticated woody aromatic for those who walk with confidence. Cedar and vetiver create a powerful backbone, while cardamom and lavender offer a refined elegance.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, BHT, Citronellol.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Exclusive', tag: 'signature',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Marcus Reid', rating: 5, date: 'April 2026', comment: 'A powerful, masculine scent. Classy and modern at the same time.' }
      ]
    },

    // ── LUXURY PERFUMES ──────────────────────────────────────
    {
      id: 'lux-001', category: 'luxury', name: 'Grand Soir',
      subtitle: 'Luxury Collection',
      price: 219, originalPrice: 289,
      size: '100ml', longevity: '14+ hours', sillage: 'Exceptional',
      family: 'Oriental',
      topNotes: ['Aldehydes', 'Iris', 'Bergamot'],
      middleNotes: ['Rose Absolute', 'Jasmine Sambac', 'Ylang-Ylang'],
      baseNotes: ['Oud', 'Sandalwood', 'Amber', 'Castoreum', 'Civet'],
      description: 'An opulent evening fragrance of grand occasion. Inspired by the great perfumery traditions of Paris and the mystique of the Arabian nights. Dazzling and unforgettable.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Farnesol, Eugenol.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Limited', tag: 'luxury',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Isabelle Fontaine', rating: 5, date: 'June 2026', comment: 'This is what luxury smells like. Simply extraordinary.' },
        { name: 'Ahmed Al Zaabi', rating: 5, date: 'May 2026', comment: 'A masterpiece. Comparable to the finest European houses.' }
      ]
    },
    {
      id: 'lux-002', category: 'luxury', name: 'Ivory Silk',
      subtitle: 'Luxury Collection',
      price: 199, originalPrice: 259,
      size: '75ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Floral',
      topNotes: ['White Tea', 'Grapefruit', 'Aldehydes'],
      middleNotes: ['Gardenia', 'White Rose', 'Magnolia'],
      baseNotes: ['Musk', 'Ambrette', 'White Sandalwood'],
      description: 'A pure, luminous floral experience as soft and delicate as the finest Italian silk. Timeless, elegant, and utterly feminine.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Alcohol.',
      image: 'assets/signature_perfume.jpg',
      badge: null, tag: 'luxury',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Caroline Duval', rating: 5, date: 'April 2026', comment: 'Soft, clean, and incredibly elegant. My everyday luxury.' }
      ]
    },

    // ── ARABIC PERFUMES ──────────────────────────────────────
    {
      id: 'ara-001', category: 'arabic', name: 'Bakhoor Nights',
      subtitle: 'Arabic Collection',
      price: 175, originalPrice: 229,
      size: '100ml', longevity: '14+ hours', sillage: 'Exceptional',
      family: 'Oud',
      topNotes: ['Saffron', 'Rose', 'Cardamom'],
      middleNotes: ['Oud Hindi', 'Agarwood', 'Amber'],
      baseNotes: ['Musk', 'Sandalwood', 'Civet'],
      description: 'Rich in heritage, this authentic Arabic attar embodies the soul of the ancient bakhoor tradition. The deep, smoky oud envelopes you like a warm desert night.',
      ingredients: 'Parfum (Fragrance), Dipropylene Glycol, BHT.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Bestseller', tag: 'arabic',
      inStock: true, rating: 5, reviews: [
        { name: 'Fatima Khalil', rating: 5, date: 'June 2026', comment: 'This reminds me of my grandmother's home. Deeply beautiful and authentic.' },
        { name: 'Omar Bin Saeed', rating: 5, date: 'May 2026', comment: 'The best oud I have smelled outside of the Gulf. Highly recommended.' }
      ]
    },
    {
      id: 'ara-002', category: 'arabic', name: 'Oud Al Amar',
      subtitle: 'Arabic Collection',
      price: 195, originalPrice: 249,
      size: '100ml', longevity: '14+ hours', sillage: 'Exceptional',
      family: 'Oud',
      topNotes: ['Red Rose', 'Raspberry', 'Saffron'],
      middleNotes: ['Oud', 'Patchouli', 'Jasmine'],
      baseNotes: ['Amber', 'Vanilla', 'Musk', 'Labdanum'],
      description: 'The Red Oud — a bold romantic statement blending the passion of rose and raspberry with deep, resinous oud and amber. Bold, passionate, and memorable.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Benzoate.',
      image: 'assets/signature_perfume.jpg',
      badge: 'New', tag: 'arabic',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Nour Al Hassan', rating: 5, date: 'April 2026', comment: 'Stunning. The rose and oud combination is absolutely perfect.' }
      ]
    },

    // ── MEN'S COLLECTION ────────────────────────────────────
    {
      id: 'men-001', category: 'mens', name: 'Black Titan',
      subtitle: "Men's Collection",
      price: 145, originalPrice: 189,
      size: '100ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Woody',
      topNotes: ['Black Pepper', 'Grapefruit', 'Nutmeg'],
      middleNotes: ['Tobacco', 'Leather', 'Cedarwood'],
      baseNotes: ['Vetiver', 'Benzoin', 'Dark Musk'],
      description: 'A bold, commanding fragrance for the modern gentleman. Dark tobacco and leather create an aura of power, while woody base notes ground this scent in earthy sophistication.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, BHT, Coumarin.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Bestseller', tag: 'mens',
      inStock: true, rating: 4.8, reviews: [
        { name: 'David Okonkwo', rating: 5, date: 'May 2026', comment: 'I have been searching for a scent like this for years. Powerful, masculine, and long-lasting.' },
        { name: 'Raza Khan', rating: 4.5, date: 'April 2026', comment: 'Great office-to-evening fragrance. Very professional yet masculine.' }
      ]
    },
    {
      id: 'men-002', category: 'mens', name: 'Ocean Breeze Intense',
      subtitle: "Men's Collection",
      price: 125, originalPrice: 165,
      size: '100ml', longevity: '8–10 hours', sillage: 'Moderate',
      family: 'Fresh',
      topNotes: ['Sea Salt', 'Lime', 'Bergamot'],
      middleNotes: ['Driftwood', 'Aquatic Accord', 'Sage'],
      baseNotes: ['Ambergris', 'White Musk', 'Cedarwood'],
      description: 'A cool, invigorating aquatic scent that captures the freshness of ocean air. Perfect for daytime wear and warm climates.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Citronellol, Linalool.',
      image: 'assets/signature_perfume.jpg',
      badge: null, tag: 'mens',
      inStock: true, rating: 4.6, reviews: [
        { name: 'Tom Harrington', rating: 4.5, date: 'June 2026', comment: 'Fresh and clean. Great for hot days.' }
      ]
    },

    // ── WOMEN'S COLLECTION ───────────────────────────────────
    {
      id: 'wom-001', category: 'womens', name: 'Rose Elixir',
      subtitle: "Women's Collection",
      price: 155, originalPrice: 199,
      size: '75ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Floral',
      topNotes: ['Rose Petals', 'Lychee', 'Pink Pepper'],
      middleNotes: ['Peony', 'Iris', 'Jasmine'],
      baseNotes: ['White Musk', 'Cedarwood', 'Sandalwood', 'Tonka Bean'],
      description: 'An enchanting feminine bouquet that celebrates the timeless beauty of the rose. Soft lychee and peony add a playful sweetness, while sandalwood and tonka bean provide a warm, sensual drydown.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Geraniol, Hydroxycitronellal.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Bestseller', tag: 'womens',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Aisha Mohammed', rating: 5, date: 'June 2026', comment: 'The most feminine and beautiful scent I own. I feel like royalty wearing this.' },
        { name: 'Emma Thompson', rating: 5, date: 'May 2026', comment: 'The rose note is so real and pure. Incredible longevity for a floral.' }
      ]
    },
    {
      id: 'wom-002', category: 'womens', name: 'Amber Goddess',
      subtitle: "Women's Collection",
      price: 165, originalPrice: 215,
      size: '75ml', longevity: '12–14 hours', sillage: 'Strong',
      family: 'Oriental',
      topNotes: ['Bergamot', 'Cinnamon', 'Plum'],
      middleNotes: ['Amber', 'Incense', 'Rose'],
      baseNotes: ['Vanilla', 'Dark Musk', 'Labdanum', 'Oakmoss'],
      description: 'Warm, seductive, and deeply feminine. Amber and vanilla create a rich golden warmth, while rose and incense add a mystical oriental depth that is impossible to ignore.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Isoeugenol, Benzyl Benzoate.',
      image: 'assets/signature_perfume.jpg',
      badge: 'New', tag: 'womens',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Zara Malik', rating: 5, date: 'April 2026', comment: 'Perfect evening fragrance. Warm, rich and incredibly seductive.' }
      ]
    },

    // ── UNISEX COLLECTION ────────────────────────────────────
    {
      id: 'uni-001', category: 'unisex', name: 'Oud Magnifique',
      subtitle: 'Unisex Collection',
      price: 175, originalPrice: 225,
      size: '100ml', longevity: '12–14 hours', sillage: 'Exceptional',
      family: 'Oud',
      topNotes: ['Pink Pepper', 'Cardamom', 'Elemi Resin'],
      middleNotes: ['Oud', 'Rose Bulgari', 'Suede'],
      baseNotes: ['Amber', 'Patchouli', 'Sandalwood', 'Benzoin'],
      description: 'A gender-defying masterpiece. Oud Magnifique is a powerful yet balanced fragrance, where the resinous depth of oud meets the delicate grace of Bulgarian rose. For those who transcend convention.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, BHT.',
      image: 'assets/signature_perfume.jpg',
      badge: 'Bestseller', tag: 'unisex',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Chris Nolan', rating: 5, date: 'May 2026', comment: 'Gender-fluid perfumery at its finest. My partner and I both wear this. Stunning.' }
      ]
    },
    {
      id: 'uni-002', category: 'unisex', name: 'Eden Citrus',
      subtitle: 'Unisex Collection',
      price: 135, originalPrice: 175,
      size: '100ml', longevity: '8–10 hours', sillage: 'Moderate',
      family: 'Citrus',
      topNotes: ['Sicilian Lemon', 'Orange Blossom', 'Grapefruit'],
      middleNotes: ['Neroli', 'White Jasmine', 'Green Tea'],
      baseNotes: ['White Musk', 'Vetiver', 'Amber'],
      description: 'A bright, sun-drenched citrus bouquet that feels like a warm tropical morning. Uplifting, clean, and universally loved by all who encounter it.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Citral.',
      image: 'assets/signature_perfume.jpg',
      badge: null, tag: 'unisex',
      inStock: true, rating: 4.6, reviews: [
        { name: 'Maya Patel', rating: 4.5, date: 'June 2026', comment: 'Fresh, bright, and perfect for hot summer days.' }
      ]
    },
    // ── NEW INSPIRED COLLECTION ─────────────────────────────────
    {
      id: 'np-001', category: 'luxury', name: 'Prestige Ruby',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Oriental',
      topNotes: ['Saffron', 'Jasmine', 'Red Currant'],
      middleNotes: ['Amberwood', 'Ambergris', 'Rose'],
      baseNotes: ['Fir Resin', 'Cedarwood', 'Musk'],
      description: 'A luxurious and rich oriental floral scent, opening with precious saffron and red currant, melting into ambergris and rose, resting on woody fir resin.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Linalool, Limonene.',
      image: 'assets/prestige_ruby.png',
      badge: 'Bestseller', tag: 'luxury',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Fatima Al Suwaidi', rating: 5, date: 'June 2026', comment: 'Extremely close to the original! The ruby bottle presentation is stunning and the scent lasts all day.' }
      ]
    },
    {
      id: 'np-002', category: 'womens', name: 'Folra',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '8–10 hours', sillage: 'Moderate',
      family: 'Floral',
      topNotes: ['Pear Blossom', 'Red Berries', 'Italian Mandarin'],
      middleNotes: ['Gardenia', 'Jasmine Sambac', 'Frangipani'],
      baseNotes: ['Patchouli', 'Brown Sugar'],
      description: 'A cheerful floral scent built around the gorgeous Gardenia flower blended with solar Jasmine absolute and sweet brown sugar.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Benzyl Salicylate, Hydroxycitronellal.',
      image: 'assets/flora.png',
      badge: 'Popular', tag: 'womens',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Sarah Miller', rating: 5, date: 'June 2026', comment: 'Beautiful sweet gardenia smell. Very fresh and bright!' }
      ]
    },
    {
      id: 'np-003', category: 'arabic', name: 'Ignite Oud',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '12–14 hours', sillage: 'Exceptional',
      family: 'Oud',
      topNotes: ['Geranium', 'Leather', 'Saffron'],
      middleNotes: ['Oud', 'Rose', 'Patchouli'],
      baseNotes: ['Amber', 'Sandalwood', 'Amyris'],
      description: 'An intense, smoky oud composition blended with rich leather, saffron, and a delicate touch of Taif rose to ignite the senses.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Alpha-Isomethyl Ionone, Citronellol.',
      image: 'assets/ignite_oud.png',
      badge: 'Exclusive', tag: 'arabic',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Zayed Al Mansoori', rating: 5, date: 'May 2026', comment: 'Strong, rich, authentic Arabic oud. Very long-lasting on clothes!' }
      ]
    },
    {
      id: 'np-004', category: 'arabic', name: 'Oud & Rose',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '12+ hours', sillage: 'Strong',
      family: 'Oud',
      topNotes: ['Turkish Rose', 'Lavender', 'Lemon'],
      middleNotes: ['Cambodian Oud', 'Saffron', 'Jasmine'],
      baseNotes: ['Sandalwood', 'White Musk', 'Amber'],
      description: 'A beautiful marriage of delicate floral rose and deep, mysterious Cambodian oud, creating an elegant and classic oriental sillage.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Geraniol, Linalool.',
      image: 'assets/oud_rose.png',
      badge: 'Bestseller', tag: 'arabic',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Mariam Al Shehhi', rating: 5, date: 'June 2026', comment: 'Perfect oud-rose fragrance. Not overpowering, very classy.' }
      ]
    },
    {
      id: 'np-005', category: 'womens', name: 'Candy Sugar',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '8–10 hours', sillage: 'Moderate',
      family: 'Citrus',
      topNotes: ['Red Fruits', 'Sweet Cherry', 'Mandarin'],
      middleNotes: ['Cotton Candy', 'Lily of the Valley', 'Sugar'],
      baseNotes: ['Vanilla Bean', 'Caramel', 'White Musk'],
      description: 'A delicious gourmand dream opening with sweet cherry and mandarin, wrapped in cotton candy and resting on a rich caramel-vanilla base.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Coumarin.',
      image: 'assets/candy_sugar.png',
      badge: 'New', tag: 'womens',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Amna Al Mheiri', rating: 5, date: 'June 2026', comment: 'Smells like sweet candies. Very playful and youthful scent!' }
      ]
    },
    {
      id: 'np-006', category: 'mens', name: 'Hermees',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Woody',
      topNotes: ['Grapefruit', 'Orange', 'Flint'],
      middleNotes: ['Pepper', 'Pink Pepper', 'Pelargonium Leaf'],
      baseNotes: ['Cedar', 'Vetiver', 'Patchouli', 'Benzoin'],
      description: 'A mineral-woody scent connecting earth and sky. Built around a core of vetiver and cedarwood with a vibrant citrus opening.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Citral.',
      image: 'assets/hermees.png',
      badge: 'Classic', tag: 'mens',
      inStock: true, rating: 4.9, reviews: [
        { name: 'David Carter', rating: 5, date: 'June 2026', comment: 'Incredible match! The mineral flint and orange notes are spot on.' }
      ]
    },
    {
      id: 'np-007', category: 'luxury', name: 'Eclair',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '12+ hours', sillage: 'Strong',
      family: 'Oriental',
      topNotes: ['Caramel', 'Milk', 'Sugar'],
      middleNotes: ['Honey', 'White Flowers'],
      baseNotes: ['Vanilla', 'Praline', 'Musk'],
      description: 'An absolute gourmand masterpiece. Warm caramel, sweet milk, and golden honey layered over rich praline and vanilla bean.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Coumarin, Benzyl Benzoate.',
      image: 'assets/eclair.png',
      badge: 'Bestseller', tag: 'luxury',
      inStock: true, rating: 5.0, reviews: [
        { name: 'Elena Rostova', rating: 5, date: 'June 2026', comment: 'This is the ultimate vanilla-caramel fragrance. Smells incredibly delicious!' }
      ]
    },
    {
      id: 'np-008', category: 'womens', name: 'Paradoxe',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '10–12 hours', sillage: 'Strong',
      family: 'Floral',
      topNotes: ['Pear', 'Tangerine', 'Bergamot'],
      middleNotes: ['Orange Blossom', 'Neroli Essence', 'Jasmine Sambac'],
      baseNotes: ['Bourbon Vanilla', 'White Amber', 'White Musk'],
      description: 'A vibrant floral bouquet capturing the paradoxes of iconic ingredients to reveal new scented sensations. Fresh, warm, and sensual.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Benzyl Alcohol.',
      image: 'assets/paradoxe.png',
      badge: 'New', tag: 'womens',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Noura Al Nahyan', rating: 5, date: 'June 2026', comment: 'Very feminine and elegant. The pear and neroli combination is beautiful.' }
      ]
    },
    {
      id: 'np-009', category: 'unisex', name: 'Kaaf',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '10+ hours', sillage: 'Strong',
      family: 'Fresh',
      topNotes: ['Red Fruits', 'Watermelon', 'Bergamot'],
      middleNotes: ['Sea Notes', 'Lavender', 'Geranium'],
      baseNotes: ['Ambergris', 'Sandalwood', 'White Musk'],
      description: 'An uplifting, clean aquatic freshness layered with juicy red fruits and lavender, resting on a sophisticated ambergris base.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Alpha-Isomethyl Ionone.',
      image: 'assets/kaaf.png',
      badge: 'Popular', tag: 'unisex',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Omar Al Hashimi', rating: 5, date: 'May 2026', comment: 'The best fresh summer scent! The watermelon and sea notes are so refreshing.' }
      ]
    },
    {
      id: 'np-010', category: 'arabic', name: 'Marj',
      subtitle: 'Inspired Perfume Mix',
      price: 40, originalPrice: 50,
      size: '40ml', longevity: '12+ hours', sillage: 'Exceptional',
      family: 'Oriental',
      topNotes: ['Black Pepper', 'Pink Pepper', 'Grapefruit'],
      middleNotes: ['Agarwood (Oud)', 'Saffron', 'Rose Taif'],
      baseNotes: ['Amber', 'Patchouli', 'Sandalwood', 'Leather'],
      description: 'A spicy and woody oriental fragrance, blending hot black pepper, precious saffron, rose Taif, and rich leather over an amber-oud base.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Eugenol, Citral.',
      image: 'assets/marj.png',
      badge: 'Exclusive', tag: 'arabic',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Hamdan Al Qassimi', rating: 5, date: 'June 2026', comment: 'Stunning spicy oud fragrance. Very high-end and has a beautiful sillage.' }
      ]
    }
  ],

  hairColours: [
    // ── PROFESSIONAL HAIR COLOURS ─────────────────────────────
    {
      id: 'hc-001', category: 'professional', name: 'Midnight Black',
      subtitle: 'Professional Series', shade: '1.0',
      price: 45, originalPrice: 60,
      coverage: '100% Grey Coverage', duration: 'Permanent',
      size: '100ml + 100ml Developer', tone: 'Cool',
      description: 'A rich, deep black with cool blue undertones. Provides total grey coverage and brilliant shine with our advanced colour-lock technology.',
      ingredients: 'Aqua, Cetearyl Alcohol, Propylene Glycol, PPD, Resorcinol, Ammonia.',
      image: 'assets/hair_colour.jpg',
      badge: 'Bestseller',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Lina Karimi', rating: 5, date: 'May 2026', comment: 'Perfect black, no brassiness, and total grey coverage. My salon clients love it.' },
        { name: 'Sara Ahmed', rating: 4.5, date: 'April 2026', comment: 'The colour is so rich and vibrant. Lasts for over 6 weeks.' }
      ]
    },
    {
      id: 'hc-002', category: 'professional', name: 'Caramel Latte',
      subtitle: 'Professional Series', shade: '5.3',
      price: 48, originalPrice: 63,
      coverage: '100% Grey Coverage', duration: 'Permanent',
      size: '100ml + 100ml Developer', tone: 'Warm',
      description: 'A sumptuous golden brown with warm caramel highlights. This shade creates depth and dimension, perfect for enhancing natural brunettes or transitioning from darker shades.',
      ingredients: 'Aqua, Cetearyl Alcohol, Propylene Glycol, p-Phenylenediamine, Resorcinol.',
      image: 'assets/hair_colour.jpg',
      badge: 'Bestseller',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Fatima Noor', rating: 5, date: 'June 2026', comment: 'The caramel tones are so beautiful and warm. My hair looks healthy and vibrant.' }
      ]
    },
    {
      id: 'hc-003', category: 'professional', name: 'Burgundy Red',
      subtitle: 'Professional Series', shade: '5.6',
      price: 50, originalPrice: 65,
      coverage: '100% Grey Coverage', duration: 'Permanent',
      size: '100ml + 100ml Developer', tone: 'Warm',
      description: 'A bold, deep burgundy with red violet undertones. This statement shade is long-lasting and vibrant, perfect for those who want to stand out.',
      ingredients: 'Aqua, Cetearyl Alcohol, Propylene Glycol, PPD, HC Red No.3.',
      image: 'assets/hair_colour.jpg',
      badge: 'Popular',
      inStock: true, rating: 4.9, reviews: [
        { name: 'Zainab Hussain', rating: 5, date: 'May 2026', comment: 'The most stunning burgundy I have ever used. Long-lasting and glossy.' }
      ]
    },
    // ── SALON COLLECTION ─────────────────────────────────────
    {
      id: 'sal-001', category: 'salon', name: 'Platinum Blonde',
      subtitle: 'Salon Collection', shade: '10.1',
      price: 65, originalPrice: 85,
      coverage: '100% Grey Coverage', duration: 'Permanent',
      size: '120ml + 120ml Developer', tone: 'Cool Ash',
      description: 'An ultra-light platinum blonde with cool ash tones. Professional-grade formula designed for salon use, delivering stunning icy results with maximum lift.',
      ingredients: 'Aqua, Cetearyl Alcohol, Propylene Glycol, PPD, Sodium Persulfate.',
      image: 'assets/hair_colour.jpg',
      badge: 'Salon Exclusive',
      inStock: true, rating: 4.8, reviews: [
        { name: 'Nina Russo', rating: 5, date: 'June 2026', comment: 'Perfect platinum result on my clients. Very professional formula.' }
      ]
    },
    {
      id: 'sal-002', category: 'salon', name: 'Copper Ginger',
      subtitle: 'Salon Collection', shade: '7.4',
      price: 58, originalPrice: 75,
      coverage: '100% Grey Coverage', duration: 'Permanent',
      size: '120ml + 120ml Developer', tone: 'Warm Copper',
      description: 'A vibrant, fiery copper with warm golden undertones. Inspired by the rich autumn palette, this salon-grade formula delivers rich, multi-dimensional colour.',
      ingredients: 'Aqua, Cetearyl Alcohol, Propylene Glycol, HC Yellow No.2, HC Orange.',
      image: 'assets/hair_colour.jpg',
      badge: 'New',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Rebecca Stone', rating: 5, date: 'April 2026', comment: 'My clients are obsessed with this copper shade. Gorgeous and long-lasting.' }
      ]
    },
    // ── HAIR CARE ────────────────────────────────────────────
    {
      id: 'care-001', category: 'haircare', name: 'Colour Protect Shampoo',
      subtitle: 'Hair Care',
      price: 28, originalPrice: 38,
      size: '300ml', duration: 'N/A',
      description: 'A sulphate-free, colour-protecting shampoo enriched with argan oil and keratin. Gently cleanses while extending the vibrancy of your colour for up to 6 weeks.',
      ingredients: 'Aqua, Sodium Lauroyl Methyl Isethionate, Cocamidopropyl Betaine, Argan Oil, Keratin Hydrolysate.',
      image: 'assets/hair_colour.jpg',
      badge: 'Essential',
      inStock: true, rating: 4.7, reviews: [
        { name: 'Maria Santos', rating: 5, date: 'May 2026', comment: 'My colour has never lasted so long. The shampoo is so gentle and smells amazing.' }
      ]
    },
    {
      id: 'care-002', category: 'haircare', name: 'Hydra-Repair Mask',
      subtitle: 'Hair Care',
      price: 35, originalPrice: 48,
      size: '250ml', duration: 'N/A',
      description: 'A deeply nourishing hair mask formulated with shea butter, collagen, and botanical oils. Restores softness, shine, and elasticity to chemically treated hair.',
      ingredients: 'Aqua, Cetearyl Alcohol, Shea Butter, Collagen Hydrolysate, Argan Oil, Jojoba Oil.',
      image: 'assets/hair_colour.jpg',
      badge: null,
      inStock: true, rating: 4.8, reviews: [
        { name: 'Alicia Ferreira', rating: 5, date: 'June 2026', comment: 'My hair is transformed after every use. Incredibly soft and shiny.' }
      ]
    },
  ],

  // ── CUSTOM PERFUME NOTES ───────────────────────────────────
  mixingNotes: {
    top: [
      { id: 'top-bergamot', name: 'Bergamot', family: 'Citrus', icon: '🍋' },
      { id: 'top-lemon', name: 'Sicilian Lemon', family: 'Citrus', icon: '🍋' },
      { id: 'top-pink-pepper', name: 'Pink Pepper', family: 'Spicy', icon: '🌶️' },
      { id: 'top-grapefruit', name: 'Grapefruit', family: 'Citrus', icon: '🍊' },
      { id: 'top-saffron', name: 'Saffron', family: 'Spicy', icon: '✨' },
      { id: 'top-cardamom', name: 'Cardamom', family: 'Spicy', icon: '🌿' },
      { id: 'top-lime', name: 'Lime', family: 'Citrus', icon: '🍋' },
      { id: 'top-neroli', name: 'Neroli', family: 'Floral', icon: '🌸' },
    ],
    middle: [
      { id: 'mid-rose', name: 'Taif Rose', family: 'Floral', icon: '🌹' },
      { id: 'mid-oud', name: 'Cambodian Oud', family: 'Oud', icon: '🪵' },
      { id: 'mid-jasmine', name: 'Jasmine Sambac', family: 'Floral', icon: '🌸' },
      { id: 'mid-iris', name: 'Iris', family: 'Floral', icon: '💜' },
      { id: 'mid-orchid', name: 'Black Orchid', family: 'Floral', icon: '🌺' },
      { id: 'mid-cedar', name: 'Cedarwood', family: 'Woody', icon: '🌲' },
      { id: 'mid-amber', name: 'Amber', family: 'Oriental', icon: '🟡' },
      { id: 'mid-leather', name: 'Leather', family: 'Woody', icon: '🤎' },
    ],
    base: [
      { id: 'base-sandalwood', name: 'Sandalwood', family: 'Woody', icon: '🪵' },
      { id: 'base-musk', name: 'White Musk', family: 'Musk', icon: '⚪' },
      { id: 'base-vanilla', name: 'Vanilla', family: 'Sweet', icon: '🍦' },
      { id: 'base-vetiver', name: 'Vetiver', family: 'Woody', icon: '🌾' },
      { id: 'base-patchouli', name: 'Patchouli', family: 'Earthy', icon: '🍂' },
      { id: 'base-ambergris', name: 'Ambergris', family: 'Marine', icon: '🌊' },
      { id: 'base-tonka', name: 'Tonka Bean', family: 'Sweet', icon: '🟤' },
      { id: 'base-labdanum', name: 'Labdanum', family: 'Resinous', icon: '🏔️' },
    ]
  },

  // ── TESTIMONIALS ───────────────────────────────────────────
  testimonials: [
    { name: 'Layla Al Rashidi', location: 'Dubai, UAE', avatar: '👩🏻', rating: 5, product: 'Paradise Royale', comment: 'Natural Paradise has completely changed how I think about fragrance. Paradise Royale is my signature scent — I have never felt so confident and sophisticated.' },
    { name: 'Thomas Beaumont', location: 'London, UK', avatar: '👨🏼', rating: 5, product: 'Black Titan', comment: 'I discovered this brand through Instagram and I am so glad I did. Black Titan is better than most designer fragrances I own at twice the price.' },
    { name: 'Noor Al Farsi', location: 'Riyadh, KSA', avatar: '👩🏽', rating: 5, product: 'Bakhoor Nights', comment: 'The most authentic Arabic oud fragrance I have found outside of specialty boutiques. The quality and longevity are extraordinary.' },
    { name: 'Priya Menon', location: 'Mumbai, India', avatar: '👩🏾', rating: 5, product: 'Caramel Latte Hair Colour', comment: 'The hair colour range is absolutely professional grade. My hairdresser could not believe it was not a salon brand. The caramel shade is gorgeous.' },
    { name: 'James Okafor', location: 'Lagos, Nigeria', avatar: '👨🏿', rating: 5, product: 'Custom Perfume Mix', comment: 'I created my own custom scent using the mixing service and it was the most personalized, thoughtful gift I have ever given. My wife was in tears.' },
    { name: 'Sofia Petrov', location: 'Moscow, Russia', avatar: '👩🏼', rating: 5, product: 'Velvet Orchid', comment: 'Velvet Orchid is everything I wanted in a fragrance — rich, feminine, luxurious, and with incredible longevity. I am a Natural Paradise customer for life.' },
  ],

  // ── HAIR SHADE GUIDE ──────────────────────────────────────
  shadeGuide: [
    { id: '1.0', name: 'Midnight Black', hex: '#0d0d0d', category: 'Black' },
    { id: '2.0', name: 'Soft Black', hex: '#1a1a1a', category: 'Black' },
    { id: '3.0', name: 'Dark Brown', hex: '#2c1a0e', category: 'Brown' },
    { id: '4.0', name: 'Medium Brown', hex: '#4a2c1a', category: 'Brown' },
    { id: '4.3', name: 'Golden Brown', hex: '#5c3316', category: 'Brown' },
    { id: '5.0', name: 'Light Brown', hex: '#7a4a2a', category: 'Brown' },
    { id: '5.3', name: 'Caramel Latte', hex: '#9b6a38', category: 'Brown' },
    { id: '5.6', name: 'Burgundy Red', hex: '#6b1a2a', category: 'Red' },
    { id: '6.0', name: 'Dark Blonde', hex: '#a07840', category: 'Blonde' },
    { id: '6.4', name: 'Copper', hex: '#b55c25', category: 'Red' },
    { id: '7.0', name: 'Medium Blonde', hex: '#c4965a', category: 'Blonde' },
    { id: '7.4', name: 'Copper Ginger', hex: '#c0622a', category: 'Red' },
    { id: '8.0', name: 'Light Blonde', hex: '#d4b06a', category: 'Blonde' },
    { id: '9.0', name: 'Very Light Blonde', hex: '#e8d090', category: 'Blonde' },
    { id: '10.1', name: 'Platinum Blonde', hex: '#f0e8d8', category: 'Blonde' },
    { id: 'FB', name: 'Fire Red', hex: '#cc2200', category: 'Red' },
    { id: 'PB', name: 'Pearl Blonde', hex: '#f5f0e8', category: 'Blonde' },
    { id: 'DB', name: 'Dark Mahogany', hex: '#3d1a1a', category: 'Brown' },
  ]
};

// Export for use in app.js
if (typeof module !== 'undefined') module.exports = { PRODUCTS, FRAGRANCE_FAMILIES };
