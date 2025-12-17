const centres = [
  {
    userId: new mongoose.Types.ObjectId("64f000000000000000000101"),
    name: "Vijayawada Green Waste Centre",
    address: "Autonagar, Vijayawada, Andhra Pradesh",
    phone: "9876543210",
    isAdminVerified: true,
    acceptedWasteTypes: ["plastic", "metal", "paper"],
    image: {
      publicId: "centres/vijayawada-green",
      url: "https://via.placeholder.com/400",
    },
    capacity: {
      current: 120,
      max: 200,
    },
    location: {
      type: "Point",
      coordinates: [80.6572, 16.5143],
    },
    operatingHours: {
      open: "08:00",
      close: "18:00",
    },
    status: "active",
    description: "Major recycling centre serving Autonagar and nearby areas.",
  },

  {
    userId: new mongoose.Types.ObjectId("64f000000000000000000102"),
    name: "Krishna River Eco Centre",
    address: "Bhavanipuram, Vijayawada, Andhra Pradesh",
    phone: "9876543211",
    isAdminVerified: true,
    acceptedWasteTypes: ["organic", "mixed"],
    image: {
      publicId: "centres/krishna-eco",
      url: "https://via.placeholder.com/400",
    },
    capacity: {
      current: 80,
      max: 150,
    },
    location: {
      type: "Point",
      coordinates: [80.6185, 16.4971],
    },
    operatingHours: {
      open: "07:00",
      close: "17:00",
    },
    status: "active",
    description: "Handles organic and mixed waste near Krishna river belt.",
  },

  {
    userId: new mongoose.Types.ObjectId("64f000000000000000000103"),
    name: "Gannavaram E-Waste Hub",
    address: "Gannavaram, Vijayawada Rural, Andhra Pradesh",
    phone: "9876543212",
    isAdminVerified: false,
    acceptedWasteTypes: ["e-waste", "metal"],
    image: {
      publicId: "centres/gannavaram-ewaste",
      url: "https://via.placeholder.com/400",
    },
    capacity: {
      current: 60,
      max: 100,
    },
    location: {
      type: "Point",
      coordinates: [80.8011, 16.5415],
    },
    operatingHours: {
      open: "09:00",
      close: "16:00",
    },
    status: "inactive",
    description: "E-waste collection hub near Gannavaram airport.",
  },

  {
    userId: new mongoose.Types.ObjectId("64f000000000000000000104"),
    name: "Patamata Recycling Centre",
    address: "Patamata, Vijayawada, Andhra Pradesh",
    phone: "9876543213",
    isAdminVerified: true,
    acceptedWasteTypes: ["plastic", "paper", "mixed"],
    image: {
      publicId: "centres/patamata-recycle",
      url: "https://via.placeholder.com/400",
    },
    capacity: {
      current: 190,
      max: 200,
    },
    location: {
      type: "Point",
      coordinates: [80.6718, 16.4938],
    },
    operatingHours: {
      open: "08:30",
      close: "18:30",
    },
    status: "full",
    description: "High-capacity recycling centre serving Patamata area.",
  },

  {
    userId: new mongoose.Types.ObjectId("64f000000000000000000105"),
    name: "Kanuru Waste Processing Unit",
    address: "Kanuru, Vijayawada, Andhra Pradesh",
    phone: "9876543214",
    isAdminVerified: true,
    acceptedWasteTypes: ["organic", "plastic", "metal"],
    image: {
      publicId: "centres/kanuru-unit",
      url: "https://via.placeholder.com/400",
    },
    capacity: {
      current: 40,
      max: 120,
    },
    location: {
      type: "Point",
      coordinates: [80.6949, 16.5079],
    },
    operatingHours: {
      open: "07:30",
      close: "17:30",
    },
    status: "active",
    description: "Local processing unit for organic and recyclable waste.",
  },
];
