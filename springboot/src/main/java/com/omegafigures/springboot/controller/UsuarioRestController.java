package com.omegafigures.springboot.controller;

import com.omegafigures.springboot.model.Usuario;
import com.omegafigures.springboot.service.UsuarioService;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UsuarioRestController {

    private final UsuarioService usuarioService;

    public UsuarioRestController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public Map<String, Usuario> obtenerUsuarios() {
        return Map.of("Usuario", usuarioService.obtenerUsuario());
    }
}
