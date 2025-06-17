const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT (à mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || 'votre-cle-secrete-super-longue';

module.exports = (User) => {
    
    /**
     * Inscription d'un nouvel utilisateur
     * @param {Object} userData - Données utilisateur
     * @returns {Object} Token et infos utilisateur
     */
    async function register(userData) {
        try {
            const { pseudo, phone_number, first_name, last_name, password } = userData;

            // Vérification des champs requis
            if (!pseudo || !phone_number || !first_name || !last_name || !password) {
                throw new Error('Pseudo, téléphone, prénom, nom et mot de passe sont requis');
            }

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { pseudo } });
            if (existingUser) {
                throw new Error('Ce pseudo existe déjà');
            }

            // Hasher le mot de passe
            const saltRounds = 12;
            const hash_password = await bcrypt.hash(password, saltRounds);

            // Créer l'utilisateur
            const user = await User.create({
                pseudo,
                phone_number,
                first_name,
                last_name,
                hash_password
            });

            // Générer le token JWT
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    pseudo: user.pseudo 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Retourner sans le mot de passe
            return {
                token,
                user: {
                    id: user.id,
                    pseudo: user.pseudo,
                    phone_number: user.phone_number,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            };

        } catch (error) {
            console.error('Erreur register:', error);
            throw error;
        }
    }

    /**
     * Connexion d'un utilisateur
     * @param {string} pseudo 
     * @param {string} password 
     * @returns {Object} Token et infos utilisateur
     */
    async function connect(pseudo, password) {
        try {
            if (!pseudo || !password) {
                throw new Error('Pseudo et mot de passe requis');
            }

            // Trouver l'utilisateur
            const user = await User.findOne({ where: { pseudo } });
            if (!user) {
                throw new Error('Pseudo ou mot de passe incorrect');
            }

            // Vérifier le mot de passe
            const isValidPassword = await bcrypt.compare(password, user.hash_password);
            if (!isValidPassword) {
                throw new Error('Pseudo ou mot de passe incorrect');
            }

            // Générer le token JWT
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    pseudo: user.pseudo 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return {
                token,
                user: {
                    id: user.id,
                    pseudo: user.pseudo,
                    phone_number: user.phone_number,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            };

        } catch (error) {
            console.error('Erreur connect:', error);
            throw error;
        }
    }

    /**
     * Récupérer l'utilisateur connecté à partir du token
     * @param {string} token 
     * @returns {Object} Infos utilisateur
     */
    async function getConnected(token) {
        try {
            if (!token) {
                throw new Error('Token requis');
            }

            // Décoder le token
            const decoded = jwt.verify(token, JWT_SECRET);
            
            // Récupérer l'utilisateur
            const user = await User.findByPk(decoded.userId, {
                attributes: ['id', 'pseudo', 'phone_number', 'first_name', 'last_name']
            });

            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            return {
                id: user.id,
                pseudo: user.pseudo,
                first_name: user.first_name,
                last_name: user.last_name,
                fullName: `${user.first_name} ${user.last_name}`
            };

        } catch (error) {
            console.error('Erreur getConnected:', error);
            throw error;
        }
    }

    return {
        register,
        connect,
        getConnected
    };
};
