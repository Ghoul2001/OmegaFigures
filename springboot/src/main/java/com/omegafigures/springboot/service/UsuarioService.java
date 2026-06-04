package com.omegafigures.springboot.service;

import com.omegafigures.springboot.model.Usuario;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    public Usuario obtenerUsuario() {
        return new Usuario(
            1,
            "civil",
            "Luis Teran",
            "1714032587",
            "lteran@gmail.com",
            "lteran"
        );
    }
}
