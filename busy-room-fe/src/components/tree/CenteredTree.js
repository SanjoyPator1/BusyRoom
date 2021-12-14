import React from "react";
import Tree from "react-d3-tree";
import './CenteredTree.css'

const debugData = [
  {
    name: "",
    attributes: {
      title: "Coffee Fudge Chip",
      subtitle: "Moo Moo Industry",
      text: "DE"
    },
    children: [
      {
        name: "",
        attributes: {
          title: "Coffee",
          subtitle: "Common Man INd",
          text: "IE"
        },
        children: [
          {
            name: "",
            attributes: {
              title: "Sunflower Milk",
              subtitle: "Happy Cow County",
              text: "IE"
            }
          },
          {
            name: "",
            attributes: {
              title: "Milky Way",
              subtitle: "Joe's Milk Farm",
              text: "ID"
            }
          },
          {
            name: "",
            attributes: {
              title: "Coffee Beans",
              subtitle: "Honey and Beans",
              text: "CN"
            },
            children: [
              {
                name: "",
                attributes: {
                  title: "Chocolate Soup",
                  subtitle: "Africa Cocoa Plant",
                  text: "ZA"
                }
              },
              {
                name: "",
                attributes: {
                  title: "Milk",
                  subtitle: "Milky Co and pvt",
                  text: "DE"
                }
              },
              {
                name: "",
                attributes: {
                  title: "Cocoa Beans",
                  subtitle: "Cocoa Co and pvt",
                  text: "DE"
                }
              },
              {
                name: "",
                attributes: {
                  title: "Milk",
                  subtitle: "SMC pvt ltd",
                  text: "DE"
                }
              }
            ]
          },
          {
            name: "",
            attributes: {
              title: "Amul Chocolate",
              subtitle: "AMUL Ind pvt",
              text: "IN"
            }
          }
        ]
      },
      {
        name: "",
        attributes: {
          title: "GOGO choco lava",
          subtitle: "Nestle pvt ltd",
          text: "IN"
        }
      }
    ]
  }
];

const containerStyles = {
  width: "100%",
  height: "100vh"
};

const Card = ({ nodeData }) => (
  <div className="cardout">
        <div className="pn">
          {nodeData.attributes.title}
        </div>
        <div className="cnge">
        <div className="cn">
          {nodeData.attributes.subtitle}
        </div>
        <div className="ge">
          {nodeData.attributes.text}
          </div>
        </div>
      
  </div>
);

export default class CenteredTree extends React.PureComponent {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    });
  }

  render() {
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={debugData}
          translate={this.state.translate}
          zoomable={true}
          orientation="vertical"
          scaleExtent={{ min: 0, max: 3 }}
          pathFunc="elbow"
          allowForeignObjects
          nodeSvgShape={{ shape: "none" }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          translate={{ x: 900, y: 200 }}
          nodeSize={{ x: 300, y: 200 }}
          nodeLabelComponent={{
            render: <Card />,
            foreignObjectWrapper: {
              style: {
                border: "0px solid white",
                width: "194px",
                height: "110px",
                x: -80,
                y: -50
              }
            }
          }}
        />
      </div>
    );
  }
}
