package com.chekh.rest;

public class Response<T> {
    private int code;
    private T data;
    private String message;

    public Response(T data) {
        this(Status.SUCCESS.code, data, "");
    }

    public Response(int code, String message) {
        this(code, null, message);
    }

    public Response(int code, T data, String message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public enum Status {
        SUCCESS(200),
        BAD_REQUEST_ERROR(400),
        UNAUTHORIZED_ERROR(401);

        private int code;

        Status(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }
    }
}
