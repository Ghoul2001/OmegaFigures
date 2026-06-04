package com.omegafigures.springboot.controller;

import com.omegafigures.springboot.model.Usuario;
import com.omegafigures.springboot.service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/gestionUsuarios")
    public String gestionUsuarios(Model model) {
        Usuario usuario = usuarioService.obtenerUsuario();
        model.addAttribute("usuario", usuario);
        return "gestionUsuarios";
    }
}
