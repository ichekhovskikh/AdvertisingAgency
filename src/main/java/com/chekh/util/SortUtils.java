package com.chekh.util;

import org.springframework.data.domain.Sort;

public class SortUtils {
    public static Sort.Direction byName(String name) {
        return name != null && name.toUpperCase().equals("DESC") ? Sort.Direction.DESC : Sort.Direction.ASC;
    }
}
