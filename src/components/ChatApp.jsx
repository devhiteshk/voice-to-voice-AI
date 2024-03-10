import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import TextToSpeech from "./TextToSpeech";

function Chats({ isAPILoading, chat, userMessage, chatBotMessage }) {
  const [height, setHeight] = useState(window?.innerHeight - 149);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window?.innerHeight - 149);
    };
    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [window?.innerHeight]);

  let dummy = [
    {
      role: "user",
      parts: "give me recipe to make curry",
    },
    {
      role: "model",
      parts:
        "**Ingredients:**\n\n**For the spice paste:**\n\n* 1 tablespoon vegetable oil\n* 1 onion, chopped\n* 4 cloves garlic, minced\n* 1 piece ginger (about 1 inch), minced\n* 2 teaspoons turmeric powder\n* 1 teaspoon cumin seeds\n* 1 teaspoon coriander seeds\n* 1/2 teaspoon red chili powder (or more to taste)\n* 1/2 teaspoon ground cardamom\n* 1/4 teaspoon fenugreek seeds\n* 1/4 teaspoon ground cloves\n\n**For the curry:**\n\n* 1 pound boneless, skinless chicken thighs or breasts, cut into 1-inch pieces\n* 1 large can (14 ounces) diced tomatoes\n* 1 can (13.5 ounces) coconut milk\n* 1/2 cup vegetable broth\n* 1 tablespoon brown sugar\n* 1 teaspoon salt\n\n**Instructions:**\n\n**To make the spice paste:**\n\n1. Heat the oil in a large skillet over medium heat.\n2. Add the onion, garlic, and ginger and cook until softened, about 5 minutes.\n3. Add the turmeric, cumin, coriander, chili powder, cardamom, fenugreek, and cloves. Cook, stirring constantly, for 1 minute.\n\n**To make the curry:**\n\n1. Transfer the spice paste to a slow cooker.\n2. Add the chicken, tomatoes, coconut milk, vegetable broth, brown sugar, and salt.\n3. Cook on low for 6-8 hours.\n4. Serve over rice or with naan bread.\n\n**Tips:**\n\n* For a richer flavor, use a combination of ground and whole spices.\n* If you don't have a slow cooker, you can simmer the curry in a large pot on the stovetop for 30-45 minutes.\n* Add vegetables such as carrots, potatoes, or bell peppers to the curry.\n* Garnish with fresh cilantro or chopped nuts.",
    },
    {
      role: "user",
      parts: "write a program in C++ belman ford algo",
    },
    {
      role: "model",
      parts:
        '```c++\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\n// Data structure to represent a graph edge\nstruct Edge {\n    int source;\n    int destination;\n    int weight;\n};\n\n// Data structure to represent a graph\nstruct Graph {\n    int V;  // Number of vertices\n    int E;  // Number of edges\n    vector<Edge> edges;\n};\n\n// Function to create a graph with V vertices and E edges\nGraph* createGraph(int V, int E) {\n    Graph* graph = new Graph;\n    graph->V = V;\n    graph->E = E;\n\n    return graph;\n}\n\n// Function to add an edge to a graph\nvoid addEdge(Graph* graph, int source, int destination, int weight) {\n    Edge edge;\n    edge.source = source;\n    edge.destination = destination;\n    edge.weight = weight;\n\n    graph->edges.push_back(edge);\n}\n\n// Function to relax an edge\nvoid relax(Graph* graph, int u, int v, int weight) {\n    // Get the edge from u to v\n    Edge* edge = &graph->edges[u][v];\n\n    // If the new distance is shorter, update the distance\n    if (edge->weight > dist[v] + weight) {\n        edge->weight = dist[v] + weight;\n    }\n}\n\n// Function to implement the Bellman-Ford algorithm\nvoid BellmanFord(Graph* graph, int source) {\n    // Initialize distances to infinity\n    vector<int> dist(graph->V, INT_MAX);\n\n    // Set the distance of the source vertex to 0\n    dist[source] = 0;\n\n    // Relax all edges V - 1 times\n    for (int i = 0; i < graph->V - 1; i++) {\n        for (Edge edge : graph->edges) {\n            relax(graph, edge.source, edge.destination, edge.weight);\n        }\n    }\n\n    // Check for negative weight cycles\n    for (Edge edge : graph->edges) {\n        if (edge.weight < 0 && dist[edge.destination] > dist[edge.source] + edge.weight) {\n            cout << "Negative weight cycle found" << endl;\n            return;\n        }\n    }\n\n    // Print the distances\n    for (int i = 0; i < graph->V; i++) {\n        cout << "Distance from source to vertex " << i << ": " << dist[i] << endl;\n    }\n}\n\nint main() {\n    // Create a graph with 5 vertices and 8 edges\n    Graph* graph = createGraph(5, 8);\n\n    // Add edges to the graph\n    addEdge(graph, 0, 1, -1);\n    addEdge(graph, 0, 2, 4);\n    addEdge(graph, 1, 2, 3);\n    addEdge(graph, 2, 3, 2);\n    addEdge(graph, 3, 4, -3);\n    addEdge(graph, 4, 0, 1);\n    addEdge(graph, 4, 1, 1);\n    addEdge(graph, 4, 2, -5);\n\n    // Find the shortest paths from vertex 0 to all other vertices\n    BellmanFord(graph, 0);\n\n    return 0;\n}\n```',
    },
  ];

  return (
    <Box height={"100vh"} bgcolor={"#1b1b32"}>
      <Box
        width={"100%"}
        maxHeight={height}
        height={{ xs: height, md: "100%" }}
        display={"flex"}
        overflow={"auto"}
        justifyContent={"center"}
        padding={"20px 20px"}
        bgcolor={"#1b1b32"}
        zIndex={10}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"35px"}
          maxWidth={"md"}
          width={"100%"}
          sx={{ color: "#fff" }}
        >
          {chat?.map((item, index) => (
            <Box
              key={index}
              display={"flex"}
              alignItems={"flex-start"}
              gap={"10px"}
              width={"100%"}
            >
              <Box
                sx={{
                  width: { md: "34px", xs: "28px" },
                  borderRadius: "50%",
                  height: { md: "34px", xs: "28px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    item?.role === "user" ? "#ff5722" : "#00c853",
                }}
              >
                <Typography
                  variant="h6"
                  color="#fff"
                  fontSize={"12px"}
                  fontFamily={"Roboto Mono, monospace"}
                  fontWeight={"bold"}
                >
                  {item?.role === "user" ? "You" : "AI"}
                </Typography>
              </Box>
              <Box mt={"8px"} width={"100%"}>
                <MarkdownRenderer>{item?.parts}</MarkdownRenderer>
              </Box>
            </Box>
          ))}
          {userMessage?.length > 0 && (
            <>
              <Box
                display={"flex"}
                alignItems={"flex-start"}
                gap={"10px"}
                width={"100%"}
              >
                <Box
                  sx={{
                    width: "34px",
                    borderRadius: "50%",
                    height: "34px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ff5722",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="#fff"
                    fontSize={"12px"}
                    fontFamily={"Roboto Mono, monospace"}
                    fontWeight={"bold"}
                  >
                    You
                  </Typography>
                </Box>
                <Box mt={"8px"} width={"100%"}>
                  <MarkdownRenderer>{userMessage}</MarkdownRenderer>
                </Box>
              </Box>
              {chatBotMessage.length > 0 && (
                <Box
                  display={"flex"}
                  alignItems={"flex-start"}
                  gap={"10px"}
                  width={"100%"}
                  pb={"20px"}
                >
                  <Box
                    sx={{
                      width: "34px",
                      borderRadius: "50%",
                      height: "34px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#00c853",
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="#fff"
                      fontSize={"12px"}
                      fontWeight={"bold"}
                      fontFamily={"Roboto Mono, monospace"}
                    >
                      AI
                    </Typography>
                  </Box>

                  <Box mt={isAPILoading ? "-2px" : "8px"} width={"100%"}>
                    {isAPILoading ? (
                      <Skeleton
                        animation="pulse"
                        sx={{ bgcolor: "rgba(255, 255, 255, 0.15)" }}
                        height={"40px"}
                        width={"100%"}
                      />
                    ) : (
                      <>
                        <MarkdownRenderer>{chatBotMessage}</MarkdownRenderer>
                        <TextToSpeech text={chatBotMessage} />
                      </>
                    )}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Chats;
