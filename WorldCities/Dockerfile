FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine

ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_CLI_TELEMETRY_OPTOUT=true
ENV HOME="/tmp"

WORKDIR /src

CMD ["dotnet", "watch", "run"]
