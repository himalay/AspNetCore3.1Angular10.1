FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine

ENV DOTNET_CLI_TELEMETRY_OPTOUT=true
ENV HOME="/tmp"

WORKDIR /src/WorldCities.Tests

CMD ["dotnet", "watch", "test"]
