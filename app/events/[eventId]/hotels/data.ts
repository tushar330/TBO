export interface RoomType {
  id: number;
  name: string;
  price: number;
  capacity: number;
  description?: string;
  amenities?: string[];
}

export interface RoomCategory {
  single: RoomType[];
  double: RoomType[];
  triple: RoomType[];
}

export interface Hotel {
  id: string; // Changed to string to match useParams
  name: string;
  location: string;
  stars: number;
  rating: number;
  price: number; // Starting price for listing
  image: string;
  description: string;
  amenities: string[];
  type: string;
  rooms: RoomCategory;
  discount?: number;
}

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: "Grand Palace Hotel",
    location: "Jaipur, Rajasthan",
    stars: 5,
    rating: 8.9,
    price: 6500,
    type: "Hotel",
    discount: 15,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    description: "Experience royal luxury in the heart of the Pink City. Grand Palace offers world-class amenities and breathtaking views of the Aravalli hills.",
    amenities: ["WiFi", "Pool", "Parking", "Breakfast", "AC", "Spa", "Gym"],
    rooms: {
      single: [
        { id: 101, name: "Standard Single", price: 6500, capacity: 1, description: "Cozy room for solo travelers." },
        { id: 102, name: "Executive Single", price: 8000, capacity: 1, description: "Spacious room with city view." }
      ],
      double: [
        { id: 103, name: "Deluxe Double", price: 9500, capacity: 2, description: "Perfect for couples, king size bed." },
        { id: 104, name: "Premium Double", price: 11000, capacity: 2, description: "Luxury amenities with balcony." }
      ],
      triple: [
        { id: 105, name: "Family Suite", price: 15000, capacity: 3, description: "Two interconnected rooms." }
      ]
    }
  },
  {
    id: '2',
    name: "Sunrise Residency",
    location: "Goa",
    stars: 3,
    rating: 7.5,
    price: 2500,
    type: "Guest House",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600",
    description: "Affordable and comfortable stay near the beach. Perfect for backpackers and long stays.",
    amenities: ["WiFi", "AC", "Beach Access"],
    rooms: {
      single: [
        { id: 201, name: "Standard Room", price: 2500, capacity: 1 }
      ],
      double: [
        { id: 202, name: "Double Room", price: 3500, capacity: 2 }
      ],
      triple: []
    }
  },
  {
    id: '3',
    name: "City View Inn",
    location: "Mumbai, Maharashtra",
    stars: 4,
    rating: 8.2,
    price: 4800,
    discount: 5,
    type: "Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600",
    description: "Ideally located in the business district, City View Inn provides modern comforts for business and leisure travelers.",
    amenities: ["WiFi", "Parking", "AC", "Restaurant", "Meeting Room"],
    rooms: {
      single: [
         { id: 301, name: "Business Single", price: 4800, capacity: 1 }
      ],
      double: [
         { id: 302, name: "Standard Double", price: 6000, capacity: 2 }
      ],
      triple: [
          { id: 303, name: "Triple Sharing", price: 7500, capacity: 3 }
      ]
    }
  },
  {
    id: '4',
    name: "Royal Heritage Resort",
    location: "Udaipur, Rajasthan",
    stars: 5,
    rating: 9.4,
    price: 12000,
    discount: 20,
    type: "Resort",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600",
    description: "A heritage property reflecting the grandeur of Rajasthan. Enjoy private pools, curated dining, and cultural shows.",
    amenities: ["WiFi", "Pool", "Parking", "Breakfast", "AC", "Spa", "Private Pool"],
    rooms: {
      single: [],
      double: [
        { id: 401, name: "Heritage Suite", price: 12000, capacity: 2 },
        { id: 402, name: "Royal Suite", price: 18000, capacity: 2 }
      ],
      triple: [
         { id: 403, name: "Maharaja Suite", price: 25000, capacity: 4 }
      ]
    }
  },
  {
    id: '5',
    name: "Backpacker's Haven",
    location: "Manali, Himachal",
    stars: 2,
    rating: 8.8,
    price: 800,
    type: "Guest House",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=600",
    description: "A vibrant community hostel in the mountains with stunning views and great vibes.",
    amenities: ["WiFi", "Parking", "Bonfire"],
    rooms: {
      single: [
        { id: 501, name: "Bunk Bed", price: 800, capacity: 1 }
      ],
      double: [
        { id: 502, name: "Private Double", price: 1500, capacity: 2 }
      ],
      triple: []
    }
  },
  {
    id: '6',
    name: "Ocean Pearl",
    location: "Chennai, Tamil Nadu",
    stars: 4,
    rating: 8.0,
    price: 5500,
    type: "Hotel",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600",
    description: "Luxury by the sea. Ocean Pearl offers sea-view rooms and exquisite seafood dining.",
    amenities: ["WiFi", "Pool", "Breakfast", "AC", "Gym"],
    rooms: {
      single: [ { id: 601, name: "Standard", price: 5500, capacity: 1} ],
      double: [ { id: 602, name: "Sea View Double", price: 7000, capacity: 2} ],
      triple: []
    }
  },
  {
      id: '7',
      name: "Mountain Retreat",
      location: "Munnar, Kerala",
      stars: 3,
      rating: 7.9,
      price: 3200,
      discount: 10,
      type: "Resort",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600",
      description: "Nestled in tea plantations, a perfect getaway for nature lovers.",
      amenities: ["WiFi", "Parking", "Breakfast", "Trekking"],
      rooms: {
          single: [],
          double: [{ id: 701, name: "Cottage", price: 3200, capacity: 2}],
          triple: [{ id: 702, name: "Family Cottage", price: 4500, capacity: 3}]
      }
  },
  {
      id: '8',
      name: "Urban Stay",
      location: "Bangalore, Karnataka",
      stars: 4,
      rating: 8.5,
      price: 4200,
      type: "Hotel",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=600",
      description: "Smart hotel in the tech hub. High-speed internet and ergonomic workspaces.",
      amenities: ["WiFi", "AC", "Breakfast", "Co-working space"],
      rooms: {
          single: [{ id: 801, name: "Smart Single", price: 4200, capacity: 1}],
          double: [{ id: 802, name: "Smart Double", price: 5000, capacity: 2}],
          triple: []
      }
  }
];
