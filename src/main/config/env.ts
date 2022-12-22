export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/api-professional',
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || 'sweater_weather-the_neighbourhood.wav'
}
