## Running the backend in Docker

### Build the Docker image

```
docker build -t todoapp .
```

### Run the container

The last argument `todoapp` is the name of the image built in the previous step

```
docker run -it -p 5000:80 -p 5001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=5001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="<passwordIsInLastPass>" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/TodoApi.pfx -v C:\Users\Josh.Jacobsen\.aspnet\https:/https/ todoapp
```
