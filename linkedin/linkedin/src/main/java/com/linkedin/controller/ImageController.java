package com.linkedin.controller;

import com.linkedin.model.Image;
import com.linkedin.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    // 🔒 Custom persistent path (change as needed)
    private final String uploadDir = "C:/Users/MK/Desktop/se/images/";

    public ImageController() {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // Create directory if it doesn't exist
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String originalName = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = originalName.contains(".") ?
                    originalName.substring(originalName.lastIndexOf('.') + 1) : "png";

            String imageId = UUID.randomUUID().toString();
            String filename = imageId + "." + extension;

            File saveFile = new File(uploadDir + filename);
            file.transferTo(saveFile);

            String filePath = "/images/" + filename;

            Image image = new Image(imageId, originalName, file.getContentType(), filePath);
            imageRepository.save(image);

            Map<String, String> response = new HashMap<>();
            response.put("imageId", imageId);
            response.put("filePath", filePath);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImageUrl(@PathVariable String imageId) {
        return imageRepository.findById(imageId)
                .map(image -> {
                    Map<String, String> result = new HashMap<>();
                    result.put("imageId", image.getImageId());
                    result.put("filePath", image.getFilePath());
                    return ResponseEntity.ok(result);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
