import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Consumiendo la función register desde nuestro AuthContext personalizado
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // Llamamos a la lógica de Firebase contenida en el contexto
            await register(email, password);
            // Si el registro es exitoso, redirigimos a la app de tareas
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al intentar registrarte.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Crear Cuenta</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Registrarse
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span className="text-muted">¿Ya tienes una cuenta? </span>
                    <Link to="/login" className="text-decoration-none">Inicia sesión</Link>
                </div>
            </div>
        </div>
    );
};