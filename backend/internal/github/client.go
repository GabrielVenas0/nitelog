package github

import (
	"backend/env"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Client struct {
	token      string
	owner      string
	httpClient *http.Client
}

func newClient() *Client {
	return &Client{
		token: env.Require("GITHUB_TOKEN"),
		owner: env.Require("GITHUB_OWNER"),
		httpClient: &http.Client {
			Timeout: 10 * time.Second,
		},
	}
}

type IssueRequest struct {
	Title string `json:"title"`
	Body string `json:"body"`
	Labels []string `json:"labels"`
}

type IssueResponse struct {
	HTMLURL string `json:"html_url"`
	Number int `json:"number"`
}

func (c *Client) PostIssue(repoName string, reqBody IssueRequest) (*IssueResponse, error) {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/issues", c.owner, repoName)
	fmt.Print(url)

	jsonPayload, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("Failed Marshal Payload: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		return nil, fmt.Errorf("Failed Http Request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer " + c.token)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
	req.Header.Set("User-Agent", "NitelogBot")

	res, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("Failed Github Request: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("Github Unexpected Error: %d", res.StatusCode)
	}

	var issueRes IssueResponse
	if err := json.NewDecoder(res.Body).Decode(&issueRes); err != nil {
		return nil, fmt.Errorf("Failed to decode Github Response: %w", err)
	}

	return &issueRes, nil
}