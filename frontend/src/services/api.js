import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Tours API
export const toursAPI = {
  getAllTours: async () => {
    const response = await axios.get(`${API}/tours/`);
    return response.data;
  },
  
  getTour: async (tourId) => {
    const response = await axios.get(`${API}/tours/${tourId}`);
    return response.data;
  },
  
  getToursByCategory: async (category) => {
    const response = await axios.get(`${API}/tours/category/${category}`);
    return response.data;
  },
  
  createBooking: async (bookingData) => {
    const response = await axios.post(`${API}/tours/bookings`, bookingData);
    return response.data;
  }
};

// Gallery API
export const galleryAPI = {
  getGallery: async () => {
    const response = await axios.get(`${API}/gallery/`);
    return response.data;
  },
  
  getGalleryByCategory: async (category) => {
    const response = await axios.get(`${API}/gallery/category/${category}`);
    return response.data;
  }
};

// Transfers API
export const transfersAPI = {
  getVehicles: async () => {
    const response = await axios.get(`${API}/transfers/vehicles`);
    return response.data;
  },
  
  createTransferBooking: async (bookingData) => {
    const response = await axios.post(`${API}/transfers/bookings`, bookingData);
    return response.data;
  }
};

// Contact API
export const contactAPI = {
  createContact: async (contactData) => {
    const response = await axios.post(`${API}/contact/`, contactData);
    return response.data;
  }
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.detail || 'An error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 500
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: 500
    };
  }
};