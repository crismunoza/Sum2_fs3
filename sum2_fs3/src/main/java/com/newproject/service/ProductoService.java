package com.newproject.service;

import com.newproject.model.Producto;
import com.newproject.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Path;


@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;
 
    private final Path rutaDirectorio = Paths.get("src/main/resources/static/images/");


    // Inicializar directorio
    public ProductoService() throws IOException {
        Files.createDirectories(rutaDirectorio);
    }

    // Guardar imagen
    public String guardarImagen(MultipartFile archivo) throws IOException {
        String nombreArchivo = StringUtils.cleanPath(archivo.getOriginalFilename());
        Path destino = rutaDirectorio.resolve(nombreArchivo);
        Files.copy(archivo.getInputStream(), destino);
        return nombreArchivo;
    }

    // Cargar imagen
    public Resource cargarImagen(String nombreArchivo) throws IOException {
        Path archivo = rutaDirectorio.resolve(nombreArchivo).normalize();
        Resource recurso = new UrlResource(archivo.toUri());

        if (recurso.exists() || recurso.isReadable()) {
            return recurso;
        } else {
            throw new RuntimeException("No se pudo leer el archivo");
        }
    }
 
    // Obtener todos los productos
    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }
    
    // Obtener un producto por su ID
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }
    
    // Crear un nuevo producto
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Actualizar un producto
    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setDescripcion(productoActualizado.getDescripcion());
                    producto.setStock(productoActualizado.getStock());
                    producto.setUrl(productoActualizado.getUrl());
                    producto.setNuevo(productoActualizado.getNuevo());
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }
    
    // Eliminar producto y su imagen
    public void eliminarProducto(Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

         String imagenUrl = producto.getUrl(); 

        try {
            Path imagenPath = rutaDirectorio.resolve(imagenUrl);  
            Files.deleteIfExists(imagenPath); 
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar la imagen", e);
        }
        productoRepository.deleteById(id);
    }

}
