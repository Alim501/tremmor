const BASE_URL = "/api/auth";

interface AuthResponse {
  token: string;
}

export const registration = async (
  email: string,
  password: string
): Promise<string | void> => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data: AuthResponse = await response.json();
    localStorage.setItem("token", data.token);
    return email;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | void> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response}`);
    }

    const data: AuthResponse = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    return email;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
