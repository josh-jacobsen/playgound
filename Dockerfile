# build .NET app:
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine as buildnet

WORKDIR /src

# Copy csproj and restore as distinct layers
COPY TodoApi/TodoApi.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY TodoApi ./
RUN dotnet publish -c Release -o /dist

# Copy results from into production container:
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine

WORKDIR /src
COPY --from=buildnet /dist .

ENTRYPOINT ["dotnet", "TodoApi.dll"]