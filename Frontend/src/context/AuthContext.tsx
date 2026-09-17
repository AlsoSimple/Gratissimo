import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { User, LoginResponse, Favorite } from '../hooks/types';
import { API_URL } from '../utils/api';

interface RegisterData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: number;
  zipcode: number;
  city: string;
}

// auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  favorites: Favorite[];
  addFavorite: (jobId: number) => Promise<void>;
  removeFavorite: (jobId: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(undefined!);



interface AuthProviderProps {
  children: ReactNode;
}

//Auth
export const AuthProvider = ({ children }: AuthProviderProps) => {

  const savedUser = Cookies.get('user');
  let initialUser: User | null = null;

  if (savedUser) {
    initialUser = JSON.parse(savedUser);
  }

  const [user, setUser] = useState<User | null>(initialUser);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const navigate = useNavigate();

  async function fetchFavorites() {
    const res = await fetch(`${API_URL}/favorites`, {
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    });

    if (res.ok) {
      setFavorites(await res.json());
    }
  }

  // User favorites
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    fetchFavorites();
  }, [user]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }

    const data: LoginResponse = await res.json();

    Cookies.set('accessToken', data.accessToken, { expires: 1 });
    Cookies.set('refreshToken', data.refreshToken, { expires: 1 });
    Cookies.set('user', JSON.stringify(data.user), { expires: 1 });

    setUser(data.user);
  };

  const register = async (data: RegisterData) => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error);
    }

    await login(data.email, data.password);
  };

  const logout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: Cookies.get('refreshToken') }),
    });

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');

    setUser(null);
    navigate('/login');
  };

  const addFavorite = async (jobId: number) => {
    const res = await fetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({ jobListingId: jobId }),
    });

    // Refetches the favorites
    if (res.ok) {
      fetchFavorites();
    }
  };

  const removeFavorite = async (jobId: number) => {
    const favorite = favorites.find((item) => item.jobListingId === jobId);
    if (!favorite) return;

    const res = await fetch(`${API_URL}/favorites/${favorite.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    });

    if (res.ok) {
      setFavorites(favorites.filter((item) => item.id !== favorite.id));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
