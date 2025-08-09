// Mock data for Zanzibar Explore Tours

export const tours = [
  {
    id: 1,
    title: "Mnemba Island (Snorkeling & Dolphin Tour)",
    description: "Enjoy a magical boat ride as you spot playful dolphins and snorkel in the crystal-clear waters near Mnemba, home to vibrant marine life.",
    image: "https://images.unsplash.com/photo-1597799119438-cbf326f268b9",
    price: "$85",
    duration: "Full Day",
    category: "water"
  },
  {
    id: 2,
    title: "Spice Farm Tour",
    description: "Explore Zanzibar's aromatic spice farms, learn about the island's spice history, and taste fresh tropical fruits and spices right from the source.",
    image: "https://images.unsplash.com/photo-1641677371014-5d0691ab5c0a",
    price: "$35",
    duration: "Half Day",
    category: "cultural"
  },
  {
    id: 3,
    title: "Nakupenda Tour",
    description: "Relax on a stunning sandbank surrounded by turquoise waters, swim, sunbathe, and enjoy fresh seafood under the open sky.",
    image: "https://images.unsplash.com/photo-1619382749984-02521fd9fc43",
    price: "$65",
    duration: "Full Day",
    category: "water"
  },
  {
    id: 4,
    title: "Nungwi Village Tour",
    description: "Discover local life in Nungwi, visit traditional dhow builders, meet the locals, and explore one of Zanzibar's most beautiful coastal villages.",
    image: "https://images.unsplash.com/photo-1621583628955-42fbc37bf424",
    price: "$45",
    duration: "Half Day",
    category: "cultural"
  },
  {
    id: 5,
    title: "Sunset Cruise",
    description: "Sail along the Indian Ocean in a traditional dhow as the sun sets, painting the sky with golden hues — a perfect romantic escape.",
    image: "https://images.unsplash.com/photo-1666778439853-540bae64fa9f",
    price: "$55",
    duration: "3 Hours",
    category: "water"
  },
  {
    id: 6,
    title: "Safari Blue",
    description: "A full-day adventure of island hopping, snorkeling, seafood feasting, and swimming in natural lagoons surrounded by coral reefs.",
    image: "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg",
    price: "$95",
    duration: "Full Day",
    category: "water"
  },
  {
    id: 7,
    title: "Prison Island Tour",
    description: "Visit the historic island once used to detain slaves, now home to giant tortoises and colonial ruins, just a short boat ride from Stone Town.",
    image: "https://images.unsplash.com/photo-1634646350436-e1448c1d4f63",
    price: "$40",
    duration: "Half Day",
    category: "cultural"
  },
  {
    id: 8,
    title: "Stone Town Tour",
    description: "Walk through the rich history of Zanzibar's old city, with its winding alleys, ancient buildings, slave market, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1684514571318-64f1fca644af",
    price: "$30",
    duration: "Half Day",
    category: "cultural"
  },
  {
    id: 9,
    title: "Jozani Forest",
    description: "Explore Zanzibar's only national park, home to the rare Red Colobus monkeys and a peaceful mangrove ecosystem.",
    image: "https://images.unsplash.com/photo-1695643875095-f5620748605d",
    price: "$25",
    duration: "Half Day",
    category: "nature"
  },
  {
    id: 10,
    title: "Sea Walk",
    description: "Experience underwater walking with a helmet, enjoy the ocean floor and its marine life without needing to swim or dive.",
    image: "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg",
    price: "$75",
    duration: "2 Hours",
    category: "water"
  },
  {
    id: 11,
    title: "Deep Sea Fishing",
    description: "Join experienced crews for a thrilling fishing trip in the deep waters of the Indian Ocean, chasing tuna, marlin, and more.",
    image: "https://images.unsplash.com/flagged/photo-1564639566047-dc4a1b86a90f",
    price: "$120",
    duration: "Full Day",
    category: "water"
  },
  {
    id: 12,
    title: "Zoo and Parks",
    description: "Get up close with local wildlife, from exotic birds to rare reptiles, in well-maintained, family-friendly parks and zoos.",
    image: "https://images.unsplash.com/photo-1502452302126-a987e1f3fea4",
    price: "$20",
    duration: "3 Hours",
    category: "nature"
  },
  {
    id: 13,
    title: "Safari Tour (Serengeti, Mikumi, Ngorongoro)",
    description: "Extend your adventure to Tanzania's mainland and witness Africa's Big Five in the most iconic national parks in guided safari tours.",
    image: "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d",
    price: "$350",
    duration: "3-5 Days",
    category: "safari"
  }
];

export const galleryImages = {
  beaches: [
    "https://images.unsplash.com/photo-1634646350433-fe03ad698448",
    "https://images.unsplash.com/photo-1621583628955-42fbc37bf424",
    "https://images.unsplash.com/photo-1619382749984-02521fd9fc43",
    "https://images.unsplash.com/photo-1634646350436-e1448c1d4f63"
  ],
  culture: [
    "https://images.unsplash.com/photo-1684514571318-64f1fca644af",
    "https://images.unsplash.com/photo-1695643875095-f5620748605d",
    "https://images.unsplash.com/photo-1502452302126-a987e1f3fea4",
    "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d"
  ],
  nature: [
    "https://images.pexels.com/photos/5858974/pexels-photo-5858974.jpeg",
    "https://images.unsplash.com/photo-1641677371014-5d0691ab5c0a",
    "https://images.pexels.com/photos/6280412/pexels-photo-6280412.jpeg"
  ],
  wildlife: [
    "https://images.unsplash.com/photo-1711802536786-149a0d0c5879",
    "https://images.unsplash.com/photo-1666778439853-540bae64fa9f"
  ]
};

export const airportTransfers = [
  {
    id: 1,
    type: "Economy Car",
    description: "Comfortable sedan for up to 3 passengers",
    price: "$25",
    features: ["Air Conditioning", "Professional Driver", "Meet & Greet"]
  },
  {
    id: 2,
    type: "SUV",
    description: "Spacious SUV for up to 6 passengers with luggage",
    price: "$35",
    features: ["Air Conditioning", "Professional Driver", "Meet & Greet", "Extra Luggage Space"]
  },
  {
    id: 3,
    type: "Minivan",
    description: "Perfect for groups up to 12 passengers",
    price: "$55",
    features: ["Air Conditioning", "Professional Driver", "Meet & Greet", "Group Friendly"]
  }
];