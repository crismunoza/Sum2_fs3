package com.newproject.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import com.newproject.model.Producto;
import com.newproject.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Obtener todos los productos - Disponible para todos
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodosLosProductos() {
        List<Producto> productos = productoService.obtenerTodosLosProductos();
    
        // Obtener el host actual dinámicamente
        String baseUrl = ServletUriComponentsBuilder.fromCurrentRequest().replacePath(null).build().toUriString();
    
        // Construir las URLS completas para las imagenes
        productos.forEach(producto -> {
            if (producto.getUrl() != null && !producto.getUrl().isEmpty()) {
                producto.setUrl(baseUrl + "/api/productos/imagenes/" + producto.getUrl());
            }
        });
    
        return ResponseEntity.ok(productos);
    }
    

    // Obtener un producto por ID - Disponible para todos
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoService.obtenerProductoPorId(id);

        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
    }

    // Crear producto - Solo para administradores
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> crearProducto(@Valid @RequestBody Producto producto) {
        Producto nuevoProducto = productoService.crearProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    // Actualizar producto - Solo para administradores
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id,
            @Valid @RequestBody Producto productoActualizado) {
        Producto producto = productoService.actualizarProducto(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }

    // Eliminar producto - Solo para administradores
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
    //nuevos para subir la imagenes 
    // Subir imagen y guardar producto
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/upload")
    public ResponseEntity<?> crearProductoConImagen(
            @RequestParam("imagen") MultipartFile imagen,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("stock") Integer stock,
            @RequestParam("nuevo") Integer nuevo) {
    
        try {
            // Guardar solo el nombre del archivo
            String nombreArchivo = productoService.guardarImagen(imagen);
    
            Producto producto = new Producto();
            producto.setNombre(nombre);
            producto.setDescripcion(descripcion);
            producto.setPrecio(precio);
            producto.setStock(stock);
            producto.setNuevo(nuevo);
            producto.setUrl(nombreArchivo); 
    
            Producto nuevoProducto = productoService.crearProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el producto");
        }
    }
    

    // Endpoint para servir imagenes
    @GetMapping("/imagenes/{nombreImagen}")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombreImagen) {
        try {
            Path rutaArchivo = Paths.get("src/main/resources/static/images").resolve(nombreImagen).normalize();
            Resource recurso = new UrlResource(rutaArchivo.toUri());
            if (!recurso.exists()) {
                throw new RuntimeException("Archivo no encontrado: " + nombreImagen);
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(rutaArchivo))
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
