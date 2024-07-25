-- 1. Tabla `equipos_competitivos`
CREATE TABLE equipos_competitivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(128) NOT NULL UNIQUE,
    descripcion TEXT,
    fundacion DATE,
    pais VARCHAR(64)
) ENGINE = InnoDB;

-- 2. Tabla `categorias_partida`
CREATE TABLE categorias_partida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(128) NOT NULL UNIQUE,
    descripcion TEXT
) ENGINE = InnoDB;

-- 3. Tabla `usuarios`
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discord_id VARCHAR(64) NOT NULL UNIQUE,
    nombre VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE,
    equipo_actual_id INT NULL,
    FOREIGN KEY (equipo_actual_id) REFERENCES equipos_competitivos(id),
    INDEX idx_discord_id (discord_id)
) ENGINE = InnoDB;

-- 4. Tabla `cuentas_invocador`
CREATE TABLE cuentas_invocador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cuenta_id VARCHAR(128) NOT NULL,
    nombre_invocador VARCHAR(128) NOT NULL,
    nivel_invocador TINYINT UNSIGNED,
    puuid VARCHAR(64) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_puuid (puuid)
) ENGINE = InnoDB;

-- 5. Tabla `partidas`
CREATE TABLE partidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    match_id VARCHAR(128) NOT NULL UNIQUE,
    categoria_id INT NOT NULL,
    equipo_id INT NULL,
    equipo_id2 INT NULL,
    game_creation BIGINT UNSIGNED,
    game_duration BIGINT UNSIGNED,
    game_end_timestamp BIGINT UNSIGNED,
    game_id BIGINT UNSIGNED,
    game_mode VARCHAR(64),
    game_name VARCHAR(128),
    game_start_timestamp BIGINT UNSIGNED,
    game_type VARCHAR(64),
    game_version VARCHAR(64),
    map_id INT UNSIGNED,
    platform_id VARCHAR(64),
    queue_id INT UNSIGNED,
    tournament_code VARCHAR(64),
    FOREIGN KEY (categoria_id) REFERENCES categorias_partida(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos_competitivos(id),
    FOREIGN KEY (equipo_id2) REFERENCES equipos_competitivos(id),
    INDEX idx_match_id (match_id),
    INDEX idx_categoria_id (categoria_id),
    INDEX idx_equipo_id (equipo_id),
    INDEX idx_equipo_id2 (equipo_id2)
) ENGINE = InnoDB;

-- 6. Tabla `participantes`
CREATE TABLE participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partida_id INT NOT NULL,
    puuid VARCHAR(64),
    cuenta_id INT,
    summoner_id VARCHAR(64),
    summoner_name VARCHAR(128),
    summoner_level TINYINT UNSIGNED,
    champion_id INT UNSIGNED,
    champion_name VARCHAR(24),
    role VARCHAR(24),
    lane VARCHAR(24),
    kills INT UNSIGNED,
    deaths INT UNSIGNED,
    assists INT UNSIGNED,
    total_damage_dealt INT UNSIGNED,
    total_damage_dealt_to_champions INT UNSIGNED,
    total_damage_taken INT UNSIGNED,
    total_heal INT UNSIGNED,
    vision_score INT UNSIGNED,
    gold_earned INT UNSIGNED,
    gold_spent INT UNSIGNED,
    win BOOLEAN,
    FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE CASCADE,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas_invocador(id),
    INDEX idx_puuid (puuid),
    INDEX idx_summoner_id (summoner_id),
    INDEX idx_champion_id (champion_id)
) ENGINE = InnoDB;

-- 7. Tabla `bans`
CREATE TABLE bans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipo_id INT NOT NULL,
    champion_id INT UNSIGNED,
    pick_turn TINYINT UNSIGNED,¡
    FOREIGN KEY (equipo_id) REFERENCES equipos_competitivos(id),
    INDEX idx_champion_id (champion_id)
) ENGINE = InnoDB;

-- 8. Tabla `objetivos`
CREATE TABLE objetivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipo_id INT NOT NULL,
    type VARCHAR(64),¡
    first BOOLEAN,
    kills INT UNSIGNED,
    FOREIGN KEY (equipo_id) REFERENCES equipos_competitivos(id)
) ENGINE = InnoDB;

-- 9. Tabla `historial_equipo`
CREATE TABLE historial_equipo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    equipo_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (equipo_id) REFERENCES equipos_competitivos(id),
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_equipo_id (equipo_id)
) ENGINE = InnoDB;

-- Índices adicionales para mejorar el rendimiento
CREATE INDEX idx_nombre_categoria ON categorias_partida (nombre);

CREATE INDEX idx_nombre_equipo ON equipos_competitivos (nombre);