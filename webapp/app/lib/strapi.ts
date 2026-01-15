import axios from 'axios';

const STRAPI_API_URL = 'http://localhost:1337/api'; // Provjeri URL svog Strapi servera

// Funkcija za dohvat svih postova
export async function fetchBlogPosts() {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/blog-posts`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Funkcija za dohvat jednog posta prema slugu
export async function fetchBlogPostBySlug(slug: string) {
  try {
    const response = await axios.get(`${STRAPI_API_URL}/blog-posts?filters[slug][$eq]=${slug}`);
    return response.data.data[0]; // Vraća prvi post sa tim slugom
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
 