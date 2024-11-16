package com.newproject.controller;


import com.newproject.model.Usuario;
import com.newproject.security.JwtUtil;
import com.newproject.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> optionalUsuario = usuarioService.buscarPorUsername(usuario.getUsername());

        if (optionalUsuario.isEmpty()) {
            logger.error("Usuario no encontrado: {}", usuario.getUsername());
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Usuario usuarioDB = optionalUsuario.get();

        if (!passwordEncoder.matches(usuario.getPassword(), usuarioDB.getPassword())) {
            logger.warn("Contraseña incorrecta para el usuario: {}", usuario.getUsername());
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }

        // Generar el token JWT
        String jwt = jwtUtil.generateToken(usuarioDB.getUsername(), usuarioDB.getRol().name());

        logger.info("Login exitoso para el usuario: {}", usuario.getUsername());
        logger.info("Rol del usuario {}: {}", usuario.getUsername(), usuarioDB.getRol().name());

        // Retornar el token en la respuesta
        return ResponseEntity.ok(jwt);
    }
}
