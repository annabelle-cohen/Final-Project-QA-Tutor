package acs.data.convertor;

import org.springframework.stereotype.Component;

import acs.boundaries.ImageBoundary;
import acs.data.entity.ImageEntity;


@Component
public class ImageConverter {

	public ImageBoundary toBoundary(ImageEntity e) {
		ImageBoundary b = new ImageBoundary();

		b.setImageID(e.getImageID());
		b.setSource(e.getSource());
		return b;
	}

}
