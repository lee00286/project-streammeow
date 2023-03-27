package signal

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
)

// HTTPSDPServer starts a HTTP Server that consumes SDPs
func HTTPSDPServer() chan string {
	port := flag.Int("port", 8080, "http server port")
	flag.Parse()

	sdpChan := make(chan string)
	http.HandleFunc("/sdp", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", http.MethodPost)
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		
		body, _ := ioutil.ReadAll(r.Body)
		
		// strBody := make(chan string)
		// go handleRequest(strBody, body)
		// fmt.Fprint(w, <-strBody)
		// sdpChan <- string(body)
		
		// fmt.Fprint(w, "done")
		// sdpChan <- string(body)
		// w.WriteHeader(http.StatusOK)
		// w.Write(body)
		
		fmt.Fprintf(w, "done")
		sdpChan <- string(body)
		// TODO: Find a way to write the respons without stopping the server
	})

	go func() {
		err := http.ListenAndServe(":"+strconv.Itoa(*port), nil)
		if err != nil {
			panic(err)
		}
	}()

	return sdpChan
}

func handleRequest(ch chan string, body []byte) {
	// Send the response on the channel
	ch <- string(body)
}
