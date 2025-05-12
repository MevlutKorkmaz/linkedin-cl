package com.linkedin.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    private String imageId;
    private String name;
    private String type;
    private String filePath;
}
