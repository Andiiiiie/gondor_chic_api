const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'votre-cle-secrete-super-longue';

const authenticate = (req, res, next) => {
    try {
        // Récupérer le token depuis le header Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token d\'authentification manquant. Header Authorization requis.'
            });
        }

        // Vérifier le format "Bearer token"
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Format de token invalide. Utilisez: Bearer <token>'
            });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Ajouter les infos utilisateur à la requête
        req.user = decoded;
        req.token = token;
        
        next();

    } catch (error) {
        console.error('Erreur authentification:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expiré. Veuillez vous reconnecter.'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token invalide.'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Erreur d\'authentification.'
        });
    }
};

module.exports = authenticate;
